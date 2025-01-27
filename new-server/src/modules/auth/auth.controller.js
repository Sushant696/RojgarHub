import { StatusCodes } from "http-status-codes";

import * as authServices from "./auth.services.js";
import { ApiError } from "../../utils/apiError.js";
import { authRegisterSchema, authLoginSchema } from "./auth.validator.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const validatedData = await authRegisterSchema.validate(req.body);
  if (
    !validatedData.username ||
    !validatedData.password ||
    !validatedData.role ||
    !validatedData.email ||
    !validatedData.contact
  ) {
    throw new ApiError(400, "All the fields are required.");
  }
  const registerUserObj = { ...validatedData };
  const createdUser = await authServices.register(registerUserObj);
  return res.json(
    new ApiResponse(
      StatusCodes.OK,
      { createdUser },
      "User Registered Successfully",
    ),
  );
});

const loginUser = asyncHandler(async (req, res) => {
  const validatedLoginData = await authLoginSchema.validate(req.body);
  const { contact, password } = validatedLoginData;
  if (!contact || !password) {
    throw new ApiError(StatusCodes.CONFLICT, "All the fields are necessary");
  }
  const loginUserObj = { contact, password };
  const loggedInUser = await authServices.login(loginUserObj);

  res.cookie("refreshToken", loggedInUser.tokens.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.cookie("accessToken", loggedInUser.tokens.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 30 * 60 * 1000,
  });
  return res.json(
    new ApiResponse(
      200,
      { ...loggedInUser.user, accessToken: loggedInUser.tokens.accessToken },
      "Login successfully",
    ),
  );
});

const logoutUser = asyncHandler(async (req, res) => {
  await authServices.logout(req?.user?.userId);
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    path: "/",
  };
  return res
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(StatusCodes.OK, {}, "Logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const token =
    req.cookies.refreshToken ||
    req.header("Authorization")?.replace("Bearer", "").trim();
  if (!token) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "No refresh token provided");
  }

  const { user, tokens } = await authServices.refreshAccessTokenService(token);

  res.cookie("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.cookie("accessToken", tokens.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 30 * 60 * 1000,
  });

  return res.json(
    new ApiResponse(
      201,
      { ...user, accessToken: tokens.accessToken },
      "Tokens refreshed successfully",
    ),
  );
});

const forgotPassword = asyncHandler(async (req, res) => {
  return res.json(201, {}, "Password changed successfully");
});

const verify = asyncHandler(async (req, res) => {
  console.log(req.user);
  return res.json(new ApiResponse(StatusCodes.OK, {}, "user verified"));
});

export const authController = {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  forgotPassword,
  verify,
};
