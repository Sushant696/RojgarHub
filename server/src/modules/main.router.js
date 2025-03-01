import { Router } from "express";
import authRouter from "./auth/auth.routes.js";
import jobRouter from "./job/job.routes.js";
import applicationRouter from "./application/application.routes.js";
import candidateRouter from "./candidate/candidate.routes.js";
import employerRouter from "./employer/employer.routes.js";

const mainRouter = Router();
mainRouter.use("/auth", authRouter);
mainRouter.use("/job", jobRouter);
mainRouter.use("/employer", employerRouter);
mainRouter.use("/candidate", candidateRouter);
mainRouter.use("/application", applicationRouter);

export default mainRouter
