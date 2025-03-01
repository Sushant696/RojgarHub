import { StatusCodes } from "http-status-codes";

import db from "../../db/db.js";
import { ApiError } from "../../utils/apiError.js";
import { uploadOnCloudinary } from "../../utils/Cloudinary.js";
import { isCloudinaryUrl } from "../../utils/isCloudinaryUrl.js";

export const OneCandidate = async (userId) => {
  const candidate = await db.candidateProfile.findFirst({
    where: { userId },
    include: {
      user: {
        select: {
          contact: true,
        },
      },
    },
  });
  if (!candidate) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Requested Candidate not found");
  }
  return candidate;
};

export const AllCandidates = async () => {
  const candidates = await db.candidateProfile.findMany();
  if (!candidates) {
    throw new ApiError(StatusCodes.NOT_FOUND, "No candidates found");
  }
  return candidates;
};

export const applicationByCandidates = async (userId) => {
  const applications = await db.candidateProfile.findUnique({
    where: { userId },
    select: {
      applications: {
        include: { job: true, interviews: true },
      },
    },
  });

  if (!applications) {
    throw new ApiError(StatusCodes.NOT_FOUND, "No applications Found");
  }

  return applications.applications;
};

export const editCandidate = async (candidateData, userId, filesPath) => {
  const candidate = await db.candidateProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!candidate) {
    throw new ApiError(StatusCodes.CONFLICT, "Candidate not found");
  }
  const profilePictureRef = isCloudinaryUrl(filesPath?.profilePath)
    ? filesPath.profilePath
    : filesPath.profilePath
      ? (await uploadOnCloudinary(filesPath.profilePath))?.url
      : null;

  const resumeUrlRef = isCloudinaryUrl(filesPath?.resumePath)
    ? filesPath.resumePath
    : filesPath.resumePath
      ? (await uploadOnCloudinary(filesPath.resumePath))?.url
      : null;

  const updateData = {
    ...candidateData,
    profile: profilePictureRef || candidate.profile,
    resumeUrl: resumeUrlRef || candidate.resumeUrl,
  };

  return await db.candidateProfile.update({
    where: {
      userId,
    },
    data: updateData,
  });
};

export async function getCandidateDashboardData(candidateId) {
  // 1. Application Status Distribution
  const applicationStatusDistribution = await db.jobApplication.groupBy({
    by: ["status"],
    where: {
      candidateId: candidateId,
    },
    _count: {
      id: true,
    },
  });

  // Define all possible application statuses
  const allStatuses = ["PENDING", "REVIEWING", "ACCEPTED", "REJECTED"];

  const statusChartData = allStatuses.map((status) => {
    const statusCount = applicationStatusDistribution.find(
      (item) => item.status === status,
    );
    return {
      status,
      count: statusCount?._count.id || 0,
    };
  });

  // 2. Timeline Data
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

  // 4. Skills Match Analysis
  const skillsMatchData = await getSkillsMatchData(candidateId);

  return {
    statusChartData,
    timelineData,
    upcomingInterviews,
    skillsMatchData,
  };
}

// Helper function to create timeline data
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

// Helper function to get skills match data
async function getSkillsMatchData(candidateId) {
  // Get candidate skills
  const candidateProfile = await db.candidateProfile.findUnique({
    where: {
      id: candidateId,
    },
    select: {
      skills: true,
    },
  });

  if (!candidateProfile?.skills) {
    return [];
  }

  const candidateSkills = candidateProfile.skills;

  // Get recent job applications and their required skills
  const applications = await db.jobApplication.findMany({
    where: {
      candidateId: candidateId,
    },
    select: {
      job: {
        select: {
          title: true,
          skills: true,
        },
      },
    },
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });

  // Calculate match percentage for each job
  return applications.map((app) => {
    const jobSkills = app.job.skills;
    const matchingSkills = jobSkills
      ? candidateSkills.filter((skill) => jobSkills.includes(skill)).length
      : 0;
    const totalJobSkills = jobSkills ? jobSkills.length : 0;

    return {
      job: app.job.title,
      matchPercentage:
        totalJobSkills > 0 ? (matchingSkills / totalJobSkills) * 100 : 0,
    };
  });
}
