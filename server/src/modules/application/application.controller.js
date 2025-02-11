import { StatusCodes } from "http-status-codes";

import * as applicationServices from "./application.services.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import applicationSchema from "./application.validators.js";

const createJobApplication = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const validatedApplicationData = await applicationSchema.validate(req.body);
  const application = await applicationServices.createApplication(
    validatedApplicationData,
    jobId,
  );

  return res.json(
    new ApiResponse(
      StatusCodes.OK,
      { application },
      "Application submitted successfully",
    ),
  );
});

const getApplicationById = asyncHandler(async (req, res) => {
  const { applicationId } = req.params;
  const application =
    await applicationServices.getApplicationById(applicationId);

  return res.json(
    new ApiResponse(
      StatusCodes.OK,
      { application },
      "Application fetched successfully",
    ),
  );
});

const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;

  const updatedApplication = await applicationServices.updateApplicationStatus(
    applicationId,
    status,
  );

  return res.json(
    new ApiResponse(
      StatusCodes.OK,
      { updatedApplication },
      "Application status updated",
    ),
  );
});

const deleteApplication = asyncHandler(async (req, res) => {
  const { applicationId } = req.params;
  await applicationServices.deleteApplication(applicationId);

  return res.json(
    new ApiResponse(StatusCodes.OK, {}, "Application deleted successfully"),
  );
});

const getApplicationsByCandidate = asyncHandler(async (req, res) => {
  const { candidateId } = req.params;
  const applications =
    await applicationServices.getApplicationsByCandidate(candidateId);

  return res.json(
    new ApiResponse(
      StatusCodes.OK,
      { applications },
      "Applications fetched successfully",
    ),
  );
});

export const applicationController = {
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
  getApplicationsByCandidate,
  createJobApplication,
};
