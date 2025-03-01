import { StatusCodes } from "http-status-codes";

import * as applicationServices from "./application.services.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import applicationSchema from "./application.validators.js";

const createJobApplication = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const { candidateId, ...applicationData } = req.body;

  const profilePath =
    applicationData.profilePicture ||
    req.files.find((file) => file.fieldname === "profilePicture")?.path;

  const resumePath =
    applicationData.resumeUrl ||
    req.files.find((file) => file.fieldname === "resumeUrl")?.path;

  const validatedApplicationData =
    await applicationSchema.validate(applicationData);

  const application = await applicationServices.createApplication(
    validatedApplicationData,
    jobId,
    candidateId,
    { profilePath, resumePath },
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
  const { status, candidateId } = req.body;

  const updatedApplication = await applicationServices.updateApplicationStatus(
    applicationId,
    candidateId,
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

const scheduleApplicationInterview = asyncHandler(async (req, res) => {
  const { applicationId } = req.params;
  const { interviewObj } = req.body;
  const interview = await applicationServices.scheduleInterview(
    applicationId,
    interviewObj,
  );
  return res.json(
    new ApiResponse(
      StatusCodes.OK,
      { interview, message: "helo" },
      "Interview schdeuled successfully",
    ),
  );
});

const updateApplicationInterview = asyncHandler(async (req, res) => {
  const { interviewId } = req.params;
  const { location, scheduledAt } = req.body;

  const updatedInterview = await applicationServices.updateInterview(
    interviewId,
    { location, scheduledAt },
  );

  return res.json(
    new ApiResponse(
      StatusCodes.OK,
      { updatedInterview },
      "Interview updated successfully",
    ),
  );
});

const deleteApplicationInterview = asyncHandler(async (req, res) => {
  const { interviewId } = req.params;

  await applicationServices.deleteInterview(interviewId);

  return res.json(
    new ApiResponse(StatusCodes.OK, {}, "Interview deleted successfully"),
  );
});

export const applicationController = {
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
  getApplicationsByCandidate,
  createJobApplication,
  scheduleApplicationInterview,
  updateApplicationInterview,
  deleteApplicationInterview,
};
