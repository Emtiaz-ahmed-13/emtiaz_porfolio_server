// routes/index.ts
import { Request, Response, Router } from "express";
import blogRoutes from "./blogRoutes";
import contactRoutes from "./contactRoutes";
import projectRoutes from "./projectRoutes";

const router = Router();

// API root route
router.get("/", (req: Request, res: Response) => {
  res.send("🚀 emtiaz's portfolio server is running");
});

// Sub-routes
router.use("/projects", projectRoutes);
router.use("/blogs", blogRoutes);
router.use("/contact", contactRoutes);

export default router;
