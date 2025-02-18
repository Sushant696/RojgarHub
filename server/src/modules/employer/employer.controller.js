import { StatusCodes } from "http-status-codes";

import db from "../../db/db.js";
import * as EmployerServices from "./employer.services.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const getEmployerById = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const employer = await EmployerServices.oneEmployer(userId);
  return res.json(
    new ApiResponse(
      StatusCodes.OK,
      { employer },
      "Employer Retrived Successfully",
    ),
  );
});

const updateEmployer = asyncHandler(async (req, res) => {
  const { employerId } = req.params;
  const { userId } = req.user;
  const data = req.body;
  const profile = req.file;
 
  let imagePath;
  if (profile) {
    imagePath = profile.path;
  } else {
    const existingJob = await db.employerProfile.findUnique({
      where: { id: employerId },
    });
    imagePath = existingJob?.image;
  }

  const updatedEmployer = await EmployerServices.updateEmployer(
    employerId,
    userId,
    {
      ...data,
      companySize: parseInt(data.companySize),
    },
    imagePath,
  );
  return res.json(
    new ApiResponse(
      StatusCodes.OK,
      { updatedEmployer },
      "Employer udpated successfully",
    ),
  );
});

const getEmployerJobs = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const jobs = await EmployerServices.employerJobs(userId);
  return res.json(
    new ApiResponse(
      StatusCodes.OK,
      { jobs },
      "Employer specific jobs Retrived Successfully",
    ),
  );
});

const getApplicationsByEmployersJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const { userId } = req.user;
  const applications = await EmployerServices.employersJobApplication(
    jobId,
    userId,
  );
  return res.json(
    new ApiResponse(
      StatusCodes.OK,
      { applications },
      "Candidates Retrived Successfully",
    ),
  );
});

const getCandidatesByEmployer = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const candidate = await EmployerServices.employerCandidates(userId);
  return res.json(
    new ApiResponse(
      StatusCodes.OK,
      { candidate },
      "Candidates Retrived Successfully",
    ),
  );
});

const getAllApplicationsByEmployer = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const applications = await EmployerServices.employerApplication(userId);
  return res.json(
    new ApiResponse(
      StatusCodes.OK,
      { applications },
      "Application Retrived Successfully",
    ),
  );
});

export const employerController = {
  getEmployerById,
  getEmployerJobs,
  updateEmployer,
  getCandidatesByEmployer,
  getAllApplicationsByEmployer,
  getApplicationsByEmployersJob,
};
