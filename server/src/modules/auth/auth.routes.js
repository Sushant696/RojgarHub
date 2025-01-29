import { Router } from "express";
import { authController } from "./auth.controller.js";
import isAuthenticated from "../../middlewares/isAuthenticated.js";
import { StatusCodes } from "http-status-codes";

const authRouter = Router();

authRouter.post("/register", authController.registerUser);
authRouter.post("/login", authController.loginUser);
authRouter.get("/logout", isAuthenticated, authController.logoutUser);
authRouter.get("/verify", isAuthenticated, authController.verify);
authRouter.get("/refresh", authController.refreshAccessToken);
authRouter.get("/test", isAuthenticated, authController.test);

export default authRouter;
