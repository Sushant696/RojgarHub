import { Router } from "express";

import { userControllers } from "./user.controller.js";


const userRouter = Router();

userRouter.get("", userControllers.registerUser)

export default userRouter;
