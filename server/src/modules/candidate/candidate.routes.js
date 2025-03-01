import { Router } from "express";
import isAuthenticated from "../../middlewares/isAuthenticated.js";
import { candidateController } from "./candidate.controller.js";

import upload from "../../utils/multer.js";

const candidateRouter = Router();

candidateRouter.get("/", isAuthenticated, candidateController.getCandidateById);

candidateRouter.get(
  "/vizData/:candidateId",
  isAuthenticated,
  candidateController.getUserVizData,
);

candidateRouter.patch(
  "/update",
  isAuthenticated,
  upload.any(),
  candidateController.editCandidate,
);

candidateRouter.get(
  "/applications",
  isAuthenticated,
  candidateController.getApplicationByCandidates,
);

export default candidateRouter;
