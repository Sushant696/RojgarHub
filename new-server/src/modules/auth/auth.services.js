import { StatusCodes } from "http-status-codes";

import db from "../../db/db.js";
import hash from "../../utils/hash.js";
import { ApiError } from "../../utils/apiError.js";
import generateTokens from "../../utils/token.js";

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

  if (!isPasswordCorrect) throw new ApiError(402, "Password is incorrect.");
  // tokens generation and stuff will be done here
  const { accessToken, refreshToken } = generateTokens(user);

  const updatedUser = await db.user.update({
    where: { id: user.id },
    data: { refreshToken: refreshToken },
    select: {
      id:true,
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
