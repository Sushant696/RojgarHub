import cors from "cors"
import helmet from "helmet";
import express from "express";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import mainRouter from "./modules/main.router.js";



export const app = express();

app.use(cookieParser());
const corsOption = {
  origin: "http://localhost:3000",
  credentials: true
};
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

app.get("/", (_, res) => {
  return res.status(200).json("Welcome to rojgarHub Server");
})

app.use("/api", mainRouter)
app.use(limiter);


// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors(corsOption));
