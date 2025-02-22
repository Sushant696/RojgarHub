import { StatusCodes } from "http-status-codes";

import db from "../../db/db.js";
import { ApiError } from "../../utils/apiError.js";

export const OneCandidate = async (userId) => {
  console.log(userId, "userId");
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

/*
 *
export const candidatesByJob = async (jobId, userId) => {
  const job = await db.job.findFirst({
    where: {
      id: jobId,
      employer: {
        userId: userId, 
      },
    },
  });

  if (!job) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      "Job not found or unauthorized access",
    );
  }

  return job;
};

export const candidatesByEmployer = async () => {
  const candidates = await db.candidateProfile.findMany();
  if (!candidates) {
    throw new ApiError(StatusCodes.NOT_FOUND, "No candidates found");
  }
  return candidates;
};
 * */
