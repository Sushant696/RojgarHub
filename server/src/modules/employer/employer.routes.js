import { Router } from "express";

import isAuthenticated from "../../middlewares/isAuthenticated.js";
import { employerController } from "./employer.controller.js";
import upload from "../../utils/multer.js";

const employerRouter = Router();

// employer specific jobs
employerRouter.get(
  "/jobs",
  isAuthenticated,
  employerController.getEmployerJobs,
);

// employer specific candidates
employerRouter.get(
  "/candidates",
  isAuthenticated,
  employerController.getCandidatesByEmployer,
);

// employer specific job's application
employerRouter.get(
  "/job-applications",
  isAuthenticated,
  employerController.getApplicationsByEmployersJob,
);

employerRouter.get(
  "/applications",
  isAuthenticated,
  employerController.getAllApplicationsByEmployer,
);

employerRouter.patch(
  "/:employerId",
  isAuthenticated,
  upload.single("profile"),
  employerController.updateEmployer,
);

employerRouter.get(
  "/visulizationData",
  isAuthenticated,
  employerController.getVisulizationData,
);

employerRouter.get("/", isAuthenticated, employerController.getEmployerById);
export default employerRouter;
