import { StatusCodes } from "http-status-codes";

import db from "../../db/db.js";
import { ApiError } from "../../utils/apiError.js";
import { uploadOnCloudinary } from "../../utils/Cloudinary.js";

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
