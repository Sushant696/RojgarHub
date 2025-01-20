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
  cors:
    process.env.NODE_ENV === "production"
      ? "http://localhost:5173/"
      : "http://localhost:5173/",
};
