import { StatusCodes } from "http-status-codes";

import * as EmployerServices from "./employer.services.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const getEmployerById = asyncHandler(async (req, res) => {
  const { employerId } = req.params;
  const employer = await EmployerServices.oneEmployer(employerId);
  return res.json(
    new ApiResponse(StatusCodes.OK, { employer }, "Employer Retrived"),
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

export const employerController = {
  getEmployerById,
  getEmployerJobs,
  getCandidatesByEmployer,
  getApplicationsByEmployersJob,
};
