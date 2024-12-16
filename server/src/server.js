import cors from "cors"
import helmet from "helmet";
import express from "express";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";

import mainRouter from "./modules/main.router.js";
import { errorHandler } from "./middlewares/errorhandler.middlewares.js";



export const app = express();

const corsOption = {
  origin: "http://localhost:5173",
  credentials: true
};

app.use(bodyParser.json())
app.use(cookieParser());
app.use(cors(corsOption));

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
app.use(errorHandler)
app.use(express.json());
app.use(helmet());


