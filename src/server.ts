import http from "http";
import app from "./app";
import { connectDB } from "./config/db";

const PORT = parseInt(process.env.PORT || "4000", 10);

(async () => {
  try {
    await connectDB();
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
})();
