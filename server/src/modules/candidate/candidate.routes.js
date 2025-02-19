import { Router } from "express";
import isAuthenticated from "../../middlewares/isAuthenticated.js";
import { candidateController } from "./candidate.controller.js";

const candidateRouter = Router();

candidateRouter.get(
  "/",
  isAuthenticated,
  candidateController.getCandidateById,
);
candidateRouter.get(
  "/jobs",
  isAuthenticated,
  candidateController.getJobsByCandidate,
);

export default candidateRouter;
