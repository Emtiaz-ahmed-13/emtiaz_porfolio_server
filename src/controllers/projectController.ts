import { Request, Response } from "express";
import Project from "../models/Project";

export async function listProjects(req: Request, res: Response) {
  const page = parseInt((req.query.page as string) || "1", 10);
  const limit = parseInt((req.query.limit as string) || "20", 10);
  const q = (req.query.q as string) || "";
  const filter: any = {};
  if (q) filter.title = { $regex: q, $options: "i" };

  const [items, total] = await Promise.all([
    Project.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Project.countDocuments(filter),
  ]);

  res.json({ items, total, page, pages: Math.ceil(total / limit) });
}

export async function getProject(req: Request, res: Response) {
  const item = await Project.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Project not found" });
  res.json(item);
}

export async function createProject(req: Request, res: Response) {
  const item = await Project.create(req.body);
  res.status(201).json(item);
}

export async function updateProject(req: Request, res: Response) {
  const item = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!item) return res.status(404).json({ message: "Project not found" });
  res.json(item);
}

export async function deleteProject(req: Request, res: Response) {
  const item = await Project.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Project not found" });
  res.status(204).send();
}
