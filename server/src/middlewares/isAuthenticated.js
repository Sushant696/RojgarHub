import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

import { ApiError } from "../../src/utils/apiError.js";
import asyncHandler from "../../src/utils/asyncHandler.js";
import config from "../../src/config/index.js";

const isAuthenticated = asyncHandler(async (req, _, next) => {
  const token =
    req.cookies.accessToken ||
    req.header("Authorization")?.replace("Bearer", "");

  if (!token) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized access");
  }

  jwt.verify(token, config.jwt.accessToken, (err, user) => {
    if (err) throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid Token");
    req.user = user;
    next();
  });
});

export default isAuthenticated;
