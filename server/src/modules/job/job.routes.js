import { Router } from "express";
import { jobController } from "./job.controller.js";
import isAuthenticated from "../../middlewares/isAuthenticated.js";
import upload from "../../utils/multer.js";

const jobRouter = Router();

jobRouter.get("/:jobId", jobController.getJobById);

// protected routes
jobRouter.post(
  "/",
  isAuthenticated,
  upload.single("image"),
  jobController.PostJob,
);

jobRouter.delete("/", isAuthenticated, jobController.deleteJob);

jobRouter.patch(
  "/",
  isAuthenticated,
  upload.single("image"),
  jobController.editJob,
);

jobRouter.get("/", isAuthenticated, jobController.getAllJobs);
export default jobRouter;
