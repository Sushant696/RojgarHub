import { Router } from "express";

import { userControllers } from "./user.controller.js";


const userRouter = Router();

userRouter.post("/", userControllers.registerUser)
userRouter.post("/login", userControllers.loginUser)



export default userRouter;
