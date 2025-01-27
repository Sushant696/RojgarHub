import jwt from "jsonwebtoken";
import config from "../../src/config/index.js";

const ACCESS_TOKEN_SECRET = config.jwt.accessToken || "";
const REFRESH_TOKEN_SECRET = config.jwt.refreshToken || "";

// Token expiry durations
const ACCESS_TOKEN_EXPIRY = config.jwt.accessTokenExpiry;
const REFRESH_TOKEN_EXPIRY = config.jwt.refreshTokenExpiry;

const generateTokens = (user) => {
  const payload = { userId: user.id, role: user.role };

  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });

  return { accessToken, refreshToken };
};

export default generateTokens;
