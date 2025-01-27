import { Router } from "express";
import { authController } from "./auth.controller.js";
import isAuthenticated from "../../middlewares/isAuthenticated.js";

const authRouter = Router();

authRouter.post("/register", authController.registerUser);
authRouter.post("/login", authController.loginUser);
authRouter.get("/logout", isAuthenticated, authController.logoutUser);
authRouter.get("/verify", isAuthenticated, authController.verify);

export default authRouter;
