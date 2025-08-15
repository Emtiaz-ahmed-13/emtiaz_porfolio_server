import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler, notFoundHandler } from "./middlewares/error";
import router from "./routes";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
  res.send("🚀 API is running. Visit /api/v1 for endpoints.");
});

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", env: process.env.NODE_ENV || "development" });
});

app.use("/api/v1", router);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
