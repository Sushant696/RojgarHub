import { Router } from "express";
import { jobController } from "./job.controller.js";
import isAuthenticated from "../../middlewares/isAuthenticated.js";
import upload from "../../utils/multer.js";

const jobRouter = Router();

jobRouter.get("/public/:jobId", jobController.getJobByIdpublic);

jobRouter.get("/:jobId", isAuthenticated, jobController.getJobById);

jobRouter.post(
  "/",
  isAuthenticated,
  upload.single("image"),
  jobController.PostJob,
);

jobRouter.patch(
  "/:jobId",
  isAuthenticated,
  upload.single("image"),
  jobController.editJob,
);

jobRouter.delete("/:jobId", isAuthenticated, jobController.deleteJob);

jobRouter.get("/toogle/:jobId", isAuthenticated, jobController.toggleJobStatus);

// application for specific job
jobRouter.get(
  "/applications/:jobId",
  isAuthenticated,
  jobController.getApplicationsByJob,
);

jobRouter.get("/", jobController.getAllJobs);

export default jobRouter;
