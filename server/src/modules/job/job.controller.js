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

const getAllJobs = asyncHandler(async (req, res) => {
  const userId = req.user?.userId;
  const jobs = await jobServices.getJobs(userId);

  return res.json(
    new ApiResponse(StatusCodes.OK, { jobs }, "Job Fetched successfully"),
  );
});

const getJobById = asyncHandler(async (req, res) => {
  const jobId = req.params?.jobId;
  const job = await jobServices.getJobById(jobId);
  return res.json(
    new ApiResponse(StatusCodes.OK, { job }, "Job fetched successfully"),
  );
});

const deleteJob = asyncHandler(async (req, res) => {
  const jobId = req.params?.jobId;

  const DeletedJob = await jobServices.deleteJob(jobId);

  return res.json(
    new ApiResponse(StatusCodes.OK, { DeletedJob }, "Job deleted successfully"),
  );
});

const toggleJobStatus = asyncHandler(async (req, res) => {
  const jobId = req.params?.jobId;
  const job = await jobServices.toogleJob(jobId);

  return res.json(
    new ApiResponse(StatusCodes.OK, { job }, "Job toggled successfully"),
  );
});

const editJob = asyncHandler(async (req, res) => {
  return new ApiResponse(StatusCodes.OK, {}, "Job deleted successfully");
});

export const jobController = {
  PostJob,
  editJob,
  deleteJob,
  getAllJobs,
  getJobById,
  toggleJobStatus,
};
