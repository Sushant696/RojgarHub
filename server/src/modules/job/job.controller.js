import { StatusCodes } from "http-status-codes";

import * as jobServices from "./job.services.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { JobValidatorSchema } from "./job.validator.js";

const PostJob = asyncHandler(async (req, res) => {
  const validatedPostJobData = await JobValidatorSchema.postJobSchema.validate(
    req.body,
  );
  const userId = req.user?.userId;
  console.log(userId);
  console.log(req.file, "files");
  const image = req.file?.path;

  const createdJob = await jobServices.postJobService(
    validatedPostJobData,
    image,
    userId,
  );

  return res.json(
    new ApiResponse(StatusCodes.OK, createdJob, "Job Created successfully"),
  );
});

const deleteJob = asyncHandler(async (req, res) => {
  return new ApiResponse(StatusCodes.OK, {}, "Job deleted successfully");
});

const editJob = asyncHandler(async (req, res) => {
  return new ApiResponse(StatusCodes.OK, {}, "Job deleted successfully");
});

const getAllJobs = asyncHandler(async (req, res) => {
  return new ApiResponse(StatusCodes.OK, {}, "Job deleted successfully");
});

const getJobById = asyncHandler(async (req, res) => {
  return new ApiResponse(StatusCodes.OK, {}, "Job deleted successfully");
});

export const jobController = {
  PostJob,
  editJob,
  deleteJob,
  getAllJobs,
  getJobById,
};
