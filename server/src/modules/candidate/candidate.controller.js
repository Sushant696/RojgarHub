import { StatusCodes } from "http-status-codes";

import asyncHandler from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import * as candidateServices from "./candidate.services.js";

const getCandidateById = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const candidate = await candidateServices.OneCandidate(userId);
  return res.json(
    new ApiResponse(
      StatusCodes.OK,
      { candidate },
      "Candidate Retrived Successfully",
    ),
  );
});

const getUserVizData = asyncHandler(async (req, res) => {
  const { candidateId } = req.params;
  const candidate =
    await candidateServices.getCandidateDashboardData(candidateId);

  return res.json(
    new ApiResponse(
      StatusCodes.OK,
      { ...candidate },
      "Candidate dashboard data retrived Successfully",
    ),
  );
});

const getApplicationByCandidates = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const applications = await candidateServices.applicationByCandidates(userId);
  return res.json(
    new ApiResponse(
      StatusCodes.OK,
      { applications },
      "Application retrived Successfully",
    ),
  );
});

const editCandidate = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const candidateData = req.body;
  const profilePath =
    candidateData.profile ||
    req.files.find((file) => file.fieldname === "profile")?.path;

  const resumePath =
    candidateData.resumeUrl ||
    req.files.find((file) => file.fieldname === "resumeUrl")?.path;

  const updatedCandidate = await candidateServices.editCandidate(
    candidateData,
    userId,
    { profilePath, resumePath },
  );

  return res.json(
    new ApiResponse(
      StatusCodes.OK,
      { candidate: updatedCandidate },
      "Candidate profile updated successfully",
    ),
  );
});

export const candidateController = {
  editCandidate,
  getUserVizData,
  getCandidateById,
  getApplicationByCandidates,
};
