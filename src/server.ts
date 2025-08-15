import { config as dotenvConfig } from "dotenv";
import mongoose from "mongoose";
import app from "./app";

dotenvConfig();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.DATABASE_URL;

if (!MONGODB_URI) {
  throw new Error("DATABASE_URL is not defined");
}

async function connectDB() {
  await mongoose.connect(MONGODB_URI!, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  });
  console.log("🟢 Connected to MongoDB");
}

// Bootstrap the server
async function bootstrap() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server startup failed:", err);
  }
}

bootstrap();
