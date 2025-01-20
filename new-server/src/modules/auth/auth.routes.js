import { Router } from "express";
import { authController } from "./auth.controller.js";

const authRouter = Router();

authRouter.post("/register", authController.registerUser);
authRouter.post("/login", authController.loginUser);
authRouter.get("/verify", authController.logoutUser);

authRouter.get("/light", (req, res) => {
  return res.json({ sucess: true, message: "completed light task" });
});

authRouter.get("/heavy", (req, res) => {
  for (let i = 0; i < 1000000000000; i++) {}
  return res.json({ sucess: true, message: "completed heavy task" });
});

export default authRouter;
