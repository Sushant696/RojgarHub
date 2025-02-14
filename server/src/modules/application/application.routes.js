import { Router } from "express";
import isAuthenticated from "../../middlewares/isAuthenticated.js";
import { applicationController } from "./application.controller.js";

const applicationRouter = Router();

applicationRouter.post(
  "/:jobId",
  isAuthenticated,
  applicationController.createJobApplication,
);

applicationRouter.get(
  "/:applicationId",
  isAuthenticated,
  applicationController.getApplicationById,
);

applicationRouter.patch(
  "/status/:applicationId",
  isAuthenticated,
  applicationController.updateApplicationStatus,
);
applicationRouter.delete(
  "/:applicationId",
  isAuthenticated,
  applicationController.deleteApplication,
);
applicationRouter.get(
  "/candidate/:candidateId",
  isAuthenticated,
  applicationController.getApplicationsByCandidate,
);

export default applicationRouter;
