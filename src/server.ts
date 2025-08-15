import http from "http";
import app from "./app";
import { connectDB } from "./config/db";

const PORT = parseInt(process.env.PORT || "4000", 10);

// Avoid reconnecting DB multiple times in Vercel
let isConnected = false;

async function init() {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
      console.log("✅ Database connected");
    } catch (err) {
      console.error("❌ Database connection failed:", err);
      process.exit(1);
    }
  }
}

if (process.env.VERCEL) {
  // Vercel Serverless Entry
} else {
  // Local Development Entry
  (async () => {
    await init();
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  })();
}
