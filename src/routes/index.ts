// routes/index.ts
import { Router } from "express";
import blogRoutes from "./blogRoutes";
import contactRoutes from "./contactRoutes";
import projectRoutes from "./projectRoutes";

const router = Router();

router.use("/projects", projectRoutes);
router.use("/blogs", blogRoutes);
router.use("/contact", contactRoutes);

export default router;
