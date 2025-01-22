import dotenv from "dotenv";
dotenv.config();

export default {
  app: {
    port: process.env.PORT,
  },
  db: {
    postgres: {
      URI: process.env.DATABASE_URL,
    },
  },
  jwt: {
    accessToken: process.env.ACCESS_TOKEN,
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,
    refreshToken: process.env.REFRESH_TOKEN,
    refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY,

  },
  cors:
    process.env.NODE_ENV === "production"
      ? "http://localhost:5173/"
      : "http://localhost:5173/",
};
