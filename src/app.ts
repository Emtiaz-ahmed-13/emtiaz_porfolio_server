import cors from "cors";
import express, { Request, Response } from "express";
import helmet from "helmet";
import { errorHandler, notFoundHandler } from "./middlewares/error";
import router from "./routes/index";

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 emtiaz's portfolio server is running.");
});

app.use("/api/v1", router);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
