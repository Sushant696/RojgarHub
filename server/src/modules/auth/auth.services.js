import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

import db from "../../db/db.js";
import hash from "../../utils/hash.js";
import { ApiError } from "../../utils/apiError.js";
import generateTokens from "../../utils/token.js";
import config from "../../config/index.js";

export const register = async (registerData) => {
  if (!registerData) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Register data is missing.");
  }

  const existinguser = await db.user.findFirst({
    where: {
      OR: [{ contact: registerData.contact }, { email: registerData.email }],
    },
  });

  if (existinguser) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      "User with this email or phone already exists.",
    );
  }

  const hashedPassword = await hash.generate(registerData.password);
  const userToCreate = { ...registerData, password: hashedPassword };

  const createdUser = await db.user.create({ data: userToCreate });
  return createdUser;
};

export const login = async (loginData) => {
  if (!loginData) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Login data is missing.");
  }

  const user = await db.user.findUnique({
    where: { contact: loginData.contact },
  });

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found.");
  }

  const isPasswordCorrect = await hash.compare(
    loginData.password,
    user.password,
  );

  if (!isPasswordCorrect)
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Password is incorrect.");
  const { accessToken, refreshToken } = generateTokens(user);

  const updatedUser = await db.user.update({
    where: { id: user.id },
    data: { refreshToken: refreshToken },
    select: {
      id: true,
      username: true,
      password: false,
      role: true,
      contact: true,
      email: true,
    },
  });

  return {
    user: updatedUser,
    tokens: {
      accessToken,
      refreshToken,
    },
  };
};

export const logout = async (userId) => {
  if (!userId) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized access");
  }
  const loggedout = await db.user.update({
    where: { id: userId },
    data: { refreshToken: undefined },
  });

  return loggedout;
};

export const refreshAccessTokenService = async (token) => {
  console.log(token, "authservice");
  if (!token) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized access");
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, config.jwt.refreshToken);
  } catch (error) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid or expired token");
  }

  if (!decodedToken || !decodedToken.userId) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      "Token payload missing userId",
    );
  }

  const { accessToken, refreshToken } = generateTokens({
    id: decodedToken.userId,
    role: decodedToken.role,
  });

  const user = await db.user.findUnique({
    where: { id: decodedToken.userId },
  });

  if (!user) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "User no longer exists");
  }

  try {
    await db.user.update({
      where: { id: decodedToken.userId },
      data: { refreshToken: refreshToken },
    });
  } catch (err) {
    console.error("Database update failed:", err);
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Database update failed",
    );
  }

  return { user, tokens: { accessToken, refreshToken } };
};
