import { Router } from "express";

// router imports
import userRouter from "./user/user.routes.js";
import employerRouter from "./employer/employer.routes.js"

const mainRouter = Router();

mainRouter.use("/user", userRouter)
mainRouter.use("/employer", employerRouter)

export default mainRouter;


