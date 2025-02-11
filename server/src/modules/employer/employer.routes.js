import { Router } from "express";

import isAuthenticated from "../../middlewares/isAuthenticated.js";
import { employerController } from "./employer.controller.js";

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
  "/applications",
  isAuthenticated,
  employerController.getApplicationsByEmployersJob,
);

employerRouter.get(
  "/:employerId",
  isAuthenticated,
  employerController.getEmployerById,
);

export default employerRouter;
