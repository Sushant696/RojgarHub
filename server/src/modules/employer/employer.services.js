import { StatusCodes } from "http-status-codes";

import db from "../../db/db.js";
import { application } from "express";
import { ApiError } from "../../utils/apiError.js";
import { uploadOnCloudinary } from "../../utils/Cloudinary.js";

export const oneEmployer = async (userId) => {
  const employer = await db.employerProfile.findFirst({
    where: { userId },
    include: {
      user: {
        select: {
          email: true,
          contact: true,
          role: true,
        },
      },
    },
  });
  if (!employer) {
    throw new ApiError(StatusCodes.NOT_FOUND, "No employer found");
  }
  return employer;
};

export const updateEmployer = async (
  employerId,
  userId,
  employerData,
  imagePath,
) => {
  if (!employerData) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Employer data is missing.");
  }
  const employer = await db.employerProfile.findFirst({
    where: { id: employerId },
  });

  if (!employer) {
    throw new ApiError(StatusCodes.NOT_FOUND, "No employer found");
  }

  let employerImgRef;
  if (imagePath) {
    if (typeof imagePath === "string" && imagePath.startsWith("/")) {
      employerImgRef = await uploadOnCloudinary(imagePath);
    } else {
      employerImgRef = { url: imagePath };
    }
  }

  const updateEmployerObj = {
    ...employerData,
    profile: employerImgRef?.url || null,
    user: {
      connect: {
        id: userId,
      },
    },
  };
  const updateEmployer = await db.employerProfile.update({
    where: { id: employerId },
    data: updateEmployerObj,
  });

  return updateEmployer;
};

// employer specific jobs
export const employerJobs = async (userId) => {
  const jobs = await db.job.findMany({
    where: {
      employer: {
        userId,
      },
    },
    include: { applications: true },
  });
  if (!jobs) {
    throw new ApiError(StatusCodes.NOT_FOUND, "No job found for the employer");
  }
  return jobs;
};

// employer specific job -> application
export const employersJobApplication = async (jobId, userId) => {
  const applications = await db.job.findMany({
    where: {
      id: jobId,
      employer: {
        userId,
      },
      include: { application },
    },
  });
  if (!applications) {
    throw new ApiError(StatusCodes.NOT_FOUND, "No candidates found");
  }
  return applications;
};

// employer's specific job candidates
export const employerCandidates = async (userId) => {
  const candidates = await db.job.findMany({
    where: {
      employer: {
        userId,
      },
    },
    include: {
      applications: {
        include: { candidate: true },
      },
    },
  });
  if (!candidates) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      "No candidates found for the employer",
    );
  }

  // Extract unique candidates from the nested structure
  const uniqueCandidates = candidates
    .flatMap((job) =>
      job.applications.map((application) => application.candidate),
    )
    .filter(
      (candidate, index, self) =>
        // Remove duplicates based on candidate ID
        index === self.findIndex((c) => c.id === candidate.id),
    );

  return uniqueCandidates;
};

// employer's specific job application
export const employerApplication = async (userId) => {
  const applications = await db.jobApplication.findMany({
    where: {
      job: {
        employer: {
          userId,
        },
      },
    },
    include: {
      job: {
        select: {
          id: true,
          title: true,
          jobDescription: true,
          location: true,
          salaryMin: true,
          salaryMax: true,
          type: true,
        },
      },
      candidate: {
        select: {
          fullName: true,
          phone: true,
          bio: true,
          skills: true,
          location: true,
        },
      },
    },
  });
  if (!applications) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      "No applications found for the employer",
    );
  }
  return applications;
};
