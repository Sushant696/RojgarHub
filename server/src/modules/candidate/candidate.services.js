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
