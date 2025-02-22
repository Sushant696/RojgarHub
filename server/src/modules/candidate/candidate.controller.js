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

const getApplicationByCandidates = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const applications = await candidateServices.applicationByCandidates(userId);
  console.log(applications, "applications");
  return res.json(
    new ApiResponse(
      StatusCodes.OK,
      { applications },
      "Application retrived Successfully",
    ),
  );
});

export const candidateController = {
  getCandidateById,
  getApplicationByCandidates,
};
