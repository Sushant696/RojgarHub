import { StatusCodes } from "http-status-codes";

import * as jobServices from "./job.services.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { JobValidatorSchema } from "./job.validator.js";
import db from "../../db/db.js";

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

const editJob = asyncHandler(async (req, res) => {
  const data = req.body;
  const image = req.file;
  const userId = req.user.userId;
  const jobId = req.params.jobId;

  let imagePath;
  if (image) {
    imagePath = image.path;
  } else {
    const existingJob = await db.job.findUnique({
      where: { id: jobId },
    });
    imagePath = existingJob?.image;
  }

  const updatedData = await jobServices.updateJob(
    jobId,
    {
      ...data,
      salaryMin: parseInt(data.salaryMin),
      salaryMax: parseInt(data.salaryMax),
    },
    imagePath,
    userId,
  );

  return res.json(
    new ApiResponse(
      StatusCodes.OK,
      { updatedData },
      "Job Updated successfully",
    ),
  );
});
const getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await jobServices.getJobs();

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

const getJobByIdpublic = asyncHandler(async (req, res) => {
  const jobId = req.params?.jobId;
  const job = await jobServices.getJobByIdPublic(jobId);
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

const getApplicationsByJob = asyncHandler(async (req, res) => {
  const jobId = req.params?.jobId;
  const userId = req?.user?.userId;
  const job = await jobServices.applicationsByJob(jobId, userId);

  return res.json(
    new ApiResponse(StatusCodes.OK, { job }, "Job toggled successfully"),
  );
});

const getCandidatesByJob = asyncHandler(async (req, res) => {
  const jobId = req.params?.jobId;
  const userId = req?.user?.userId;
  const job = await jobServices.applicationsByJob(jobId, userId);

  return res.json(
    new ApiResponse(StatusCodes.OK, { job }, "Job toggled successfully"),
  );
});

export const jobController = {
  editJob,
  PostJob,
  deleteJob,
  getJobById,
  getAllJobs,
  toggleJobStatus,
  getJobByIdpublic,
  getCandidatesByJob,
  getApplicationsByJob,
};
