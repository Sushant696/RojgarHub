import { StatusCodes } from "http-status-codes";

import db from "../../db/db.js";
import { ApiError } from "../../utils/apiError.js";
import { uploadOnCloudinary } from "../../utils/Cloudinary.js";
export const ApplicationStatusValues = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REVIEWING: "REVIEWING",
  REJECTED: "REJECTED",
};

export const postJobService = async (postJobData, imagePath, userId) => {
  if (!postJobData) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Job data is missing.");
  }
  if (!imagePath) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Image not found");
  }

  const jobImageRef = await uploadOnCloudinary(imagePath);

  const employer = await db.employerProfile.findFirst({
    where: {
      userId: userId,
    },
  });

  if (!employer) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Employer profile not found.");
  }

  const postJobObj = {
    ...postJobData,
    image: jobImageRef.url,
    employer: {
      connect: {
        id: employer.id,
      },
    },
  };

  const job = await db.job.create({
    data: postJobObj,
  });
  return job;
};

export const updateJob = async (jobId, updateJobData, imagePath, userId) => {
  if (!updateJobData) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Job data is missing.");
  }

  let jobImageRef;
  if (imagePath) {
    if (typeof imagePath === "string" && imagePath.startsWith("/")) {
      jobImageRef = await uploadOnCloudinary(imagePath);
    } else {
      jobImageRef = { url: imagePath };
    }
  }

  const employer = await db.employerProfile.findFirst({
    where: {
      userId: userId,
    },
  });

  if (!employer) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Employer profile not found.");
  }

  const updateJobObj = {
    ...updateJobData,
    image: jobImageRef?.url || null,
    employer: {
      connect: {
        id: employer.id,
      },
    },
  };

  const job = await db.job.update({
    where: { id: jobId },
    data: updateJobObj,
  });

  return job;
};

export const getJobs = async () => {
  const job = await db.job.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return job;
};

export const getJobByIdPublic = async (jobId) => {
  const job = await db.job.findFirst({
    where: { id: jobId },
    include: {
      employer: {
        select: {
          companyName: true,
          companySize: true,
          profile: true,
          industry: true,
          location: true,
        },
      },
    },
  });
  if (!job) {
    throw new ApiError(404, "Requested Job not found");
  }
  return job;
};

export const getJobById = async (jobId) => {
  const job = await db.job.findFirst({
    where: { id: jobId },
    include: {
      applications: {
        include: { candidate: true },
      },
    },
  });
  if (!job) {
    throw new ApiError(404, "Requested Job not found");
  }
  return job;
};

export const toogleJob = async (jobId) => {
  const job = await db.job.findFirst({
    where: { id: jobId },
    include: { applications: true },
  });

  if (!job) {
    throw new ApiError(404, "Requested Job not found");
  }

  const newStatus = job.status === "OPEN" ? "CLOSED" : "OPEN";

  const updatedJob = await db.job.update({
    where: { id: jobId },
    data: { status: newStatus },
    include: { applications: true },
  });

  return updatedJob;
};

export const deleteJob = async (jobId) => {
  const existingJob = await db.job.findFirst({
    where: { id: jobId },
    include: { applications: true },
  });
  if (!existingJob) {
    throw new ApiError(404, "Requested Job not found");
  }

  const deletedJob = await db.job.delete({
    where: { id: jobId },
    include: { applications: true },
  });

  return deletedJob;
};

export const applicationsByJob = async (jobId, userId) => {
  const existingJob = await db.job.findMany({
    where: {
      id: jobId,
      employer: { userId },
    },
    include: { applications: true },
  });

  if (!existingJob) {
    throw new ApiError(404, "No applications found");
  }
  return existingJob;
};

export const candidatesByJob = async (jobId, userId) => {
  const existingJob = await db.job.findMany({
    where: {
      id: jobId,
      employer: { userId },
    },
    include: { applications: true },
  });

  if (!existingJob) {
    throw new ApiError(404, "No applications found");
  }
  return existingJob;
};

export async function getCandidateDashboardData(candidateId) {
  const applicationStatusDistribution = await db.jobApplication.groupBy({
    by: ["status"],
    where: {
      candidateId: candidateId,
    },
    _count: {
      id: true,
    },
  });

  const statusChartData = Object.values().map((status) => {
    const statusCount = applicationStatusDistribution.find(
      (item) => item.status === status,
    );
    return {
      status,
      count: statusCount?._count.id || 0,
    };
  });

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const applications = await db.jobApplication.findMany({
    where: {
      candidateId: candidateId,
      createdAt: {
        gte: oneMonthAgo,
      },
    },
    select: {
      createdAt: true,
      status: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Create weekly data points
  const timelineData = createTimelineData(applications);

  // 3. Interview Schedule
  const upcomingInterviews = await db.interview.findMany({
    where: {
      jobApplication: {
        candidateId: candidateId,
      },
      scheduledAt: {
        gte: new Date(),
      },
      status: {
        in: ["PENDING", "CONFIRMED"],
      },
    },
    include: {
      jobApplication: {
        include: {
          job: {
            select: {
              title: true,
              employer: {
                select: {
                  companyName: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      scheduledAt: "asc",
    },
    take: 5,
  });

  return {
    statusChartData,
    timelineData,
    upcomingInterviews,
  };
}

function createTimelineData(applications) {
  const timelineData = [];
  const today = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  // Create weekly intervals
  for (let d = new Date(oneMonthAgo); d <= today; d.setDate(d.getDate() + 7)) {
    const weekStart = new Date(d);
    const weekEnd = new Date(d);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const weekApplications = applications.filter(
      (app) =>
        new Date(app.createdAt) >= weekStart &&
        new Date(app.createdAt) <= weekEnd,
    );

    timelineData.push({
      week: `${weekStart.getMonth() + 1}/${weekStart.getDate()}`,
      applications: weekApplications.length,
      accepted: weekApplications.filter((app) => app.status === "ACCEPTED")
        .length,
      rejected: weekApplications.filter((app) => app.status === "REJECTED")
        .length,
      pending: weekApplications.filter((app) =>
        ["PENDING", "REVIEWING"].includes(app.status),
      ).length,
    });
  }

  return timelineData;
}
export const searchedJob = async (data) => {
  try {
    const { keywords, industry, location } = data;

    const whereConditions = {
      status: "OPEN",
    };

    if (keywords) {
      whereConditions.OR = [
        { title: { contains: keywords, mode: "insensitive" } },
        { jobDescription: { contains: keywords, mode: "insensitive" } },
      ];
    }

    if (industry) {
      whereConditions.employer = {
        industry: { contains: industry, mode: "insensitive" },
      };
    }

    if (location) {
      whereConditions.location = { contains: location, mode: "insensitive" };
    }

    return await db.job.findMany({
      where: whereConditions,
      include: {
        employer: {
          select: {
            companyName: true,
            industry: true,
            profile: true,
            location: true,
          },
        },
        _count: { select: { applications: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error in searchedJob service:", error);
    throw error;
  }
};
