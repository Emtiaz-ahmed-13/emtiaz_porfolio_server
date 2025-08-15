import http from "http";
import app from "./app";
import { connectDB } from "./config/db";

const PORT = parseInt(process.env.PORT || "4000", 10);

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
  // Vercel serverless handler
} else {
  // Local development
  (async () => {
    await init();
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  })();
}
