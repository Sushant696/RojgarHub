import { StatusCodes } from "http-status-codes";
import db from "../../db/db.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import authRegisterSchema from "./auth.validator.js";
import hash from "../../utils/hash.js";

const registerUser = asyncHandler(async (req, res) => {
  const validatedData = await authRegisterSchema.validate(req.body);
  if (
    !validatedData.password ||
    !validatedData.email ||
    !validatedData.contact
  ) {
    throw new ApiError(400, "All the fields are required.");
  }

  const existinguser = await db.user.findUnique({
    where: { contact: validatedData.contact, email: validatedData.email },
  });

  if (existinguser) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      "User with this email or phone already exist",
    );
  }

  const hashedPassword = await hash.generate(validatedData.password);

  const registerUserObj = {
    username: validatedData.username,
    role: validatedData.role,
    email: validatedData.email,
    contact: validatedData.contact,
    password: hashedPassword,
  };

  const createdUser = await db.user.create({
    data: registerUserObj,
  });

  return res.json(
    new ApiResponse(200, { createdUser }, "User Registered Successfully"),
  );
});

const loginUser = asyncHandler(async (req, res) => {
  const { contact, password } = req.body;
  console.log(contact, password);

  if (!contact || !password) {
    throw new ApiError(400, "All the fields are necessary");
  }

  const user = await db.user.findUnique({ where: { contact } });
  console.log(user);
  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  const isPasswordCorrect = await hash.compare(password, user.password);

  if (!isPasswordCorrect) throw new ApiError(402, "Password is incorrect.");

  return res.json(new ApiResponse(200, {}, "Login successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  return res.json(new ApiResponse(201, {}, "Logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  return res.json(new ApiResponse(201, {}, "Tokens refreshed successfully "));
});

const forgotPassword = asyncHandler(async (req, res) => {
  return res.json(201, {}, "Password changed successfully");
  // logout user
});

export const authController = {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  forgotPassword,
};
