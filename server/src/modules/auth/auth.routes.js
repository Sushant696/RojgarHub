import { Router } from "express";
import { authController } from "./auth.controller.js";

const authRouter = Router();

authRouter.post("/register", authController.registerUser)
authRouter.post("/login", authController.loginUser)

export default authRouter;
