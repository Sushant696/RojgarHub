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

export const getJobs = async (employerId) => {
  const job = await db.job.findMany({
    where: {
      employer: { userId: employerId },
    },
    include: {
      applications: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return job;
};

export const getJobById = async (jobId) => {
  console.log(jobId);

  const job = await db.job.findFirst({
    where: { id: jobId },
    include: { applications: true },
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
  console.log(existingJob);
  if (!existingJob) {
    throw new ApiError(404, "Requested Job not found");
  }

  const deletedJob = await db.job.delete({
    where: { id: jobId },
    include: { applications: true },
  });

  return deletedJob;
};
