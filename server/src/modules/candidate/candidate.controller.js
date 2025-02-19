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

const getJobsByCandidate = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const userId = req.user.userId;
  const jobs = candidateServices.jobsByCandidate(jobId, userId);

  return res.json(
    new ApiResponse(StatusCodes.OK, { jobs }, "User Registered Successfully"),
  );
});

export const candidateController = {
  getCandidateById,
  getJobsByCandidate,
};
