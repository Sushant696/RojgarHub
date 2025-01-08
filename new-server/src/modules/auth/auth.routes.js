import { Router } from "express";
import { authController } from "./auth.controller.js";

const authRouter = Router();

authRouter.post("/register", authController.registerUser)
authRouter.post("/login", authController.loginUser)
authRouter.get("/verify", authController.logoutUser);

export default authRouter;
