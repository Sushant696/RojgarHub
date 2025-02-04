import { Router } from "express";
import authRouter from "./auth/auth.routes.js";
import jobRouter from "./job/job.routes.js";

const mainRouter = Router();
mainRouter.use("/auth", authRouter);
mainRouter.use("/job", jobRouter);
export default mainRouter;
