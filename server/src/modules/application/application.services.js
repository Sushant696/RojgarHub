import { StatusCodes } from "http-status-codes";

import db from "../../db/db.js";
import { ApiError } from "../../utils/apiError.js";

export const createApplication = async (data, jobId) => {
  const existingApplication = await db.jobApplication.findUnique({
    where: {
      jobId_candidateId: {
        jobId: jobId,
        candidateId: data.candidateId,
      },
    },
  });

  if (existingApplication) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      "You have already applied for this job.",
    );
  }

  const job = await db.job.findFirst({
    where: {
      id: jobId,
    },
    include: {
      applications: true,
    },
  });

  const { candidateId, ...applicationData } = data;
  if (!job) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Job Not Found.");
  }

  if (job.status !== "OPEN") {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "This job is closed for applications.",
    );
  }

  return await db.jobApplication.create({
    data: {
      ...applicationData,
      job: {
        connect: {
          id: jobId,
        },
      },
      candidate: {
        connect: {
          id: candidateId,
        },
      },
    },
  });
};

export const getApplicationById = async (applicationId) => {
  return await db.jobApplication.findUnique({
    where: { id: applicationId },
    include: {
      job: true,
      candidate: true,
      interviews: true,
    },
  });
};

// Update application status
export const updateApplicationStatus = async (
  applicationId,
  candidateId,
  status,
) => {
  const existingApplication = await db.jobApplication.findUnique({
    where: {
      id: applicationId,
      candidate: {
        id: candidateId,
      },
    },
  });
  if (!existingApplication) {
    throw new ApiError(StatusCodes.CONFLICT, "Application Not Found");
  }

  return await db.jobApplication.update({
    where: { id: applicationId },
    data: { status },
  });
};

// Delete an application
export const deleteApplication = async (applicationId) => {
  return await db.jobApplication.delete({
    where: { id: applicationId },
  });
};

// Get all applications for a candidate
export const getApplicationsByCandidate = async (candidateId) => {
  return await db.jobApplication.findMany({
    where: { candidateId },
    include: { job: true },
  });
};

export const scheduleInterview = async (applicationId, interviewData) => {
  const application = await db.jobApplication.findUnique({
    where: { id: applicationId },
  });
  if (!application) {
    throw new ApiError(StatusCodes.NOT_FOUND);
  }
  if (application.status !== "ACCEPTED") {
    throw new ApiError(
      StatusCodes.CONFLICT,
      "Only Accepted applications candidates can be called  for Interview.",
    );
  }
  const { scheduledAt, ...data } = interviewData;

  const parsedScheduledAt = new Date(scheduledAt);
  if (isNaN(parsedScheduledAt.getTime())) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid scheduledAt format");
  }

  const interview = await db.interview.create({
    data: {
      jobApplicationId: applicationId,
      scheduledAt: parsedScheduledAt,
      ...data,
    },
  });

  return interview;
};

export const updateInterview = async (interviewId, interviewData) => {
  const interview = await db.interview.findUnique({
    where: { id: interviewId },
  });

  if (!interview) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Interview not found");
  }
  const { scheduledAt, ...data } = interviewData;

  if (scheduledAt) {
    const parsedScheduledAt = new Date(scheduledAt);
    if (isNaN(parsedScheduledAt.getTime())) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid scheduledAt format");
    }
    data.scheduledAt = parsedScheduledAt;
  }

  const updatedInterview = await db.interview.update({
    where: { id: interviewId },
    data,
  });

  return updatedInterview;
};

export const deleteInterview = async (interviewId) => {
  const interview = await db.interview.findUnique({
    where: { id: interviewId },
  });
  
  if (!interview) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Interview not found");
  }
  
  await db.interview.delete({ where: { id: interviewId } });

  return;
};
