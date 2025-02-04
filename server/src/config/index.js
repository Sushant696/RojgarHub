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
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
  cors:
    process.env.NODE_ENV === "production"
      ? "http://localhost:5173/"
      : "http://localhost:5173/",
};
