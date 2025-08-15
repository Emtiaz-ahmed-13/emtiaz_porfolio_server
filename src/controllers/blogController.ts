import { Request, Response } from 'express';
import Blog from '../models/Blog';

export async function listBlogs(req: Request, res: Response) {
  const page = parseInt((req.query.page as string) || '1', 10);
  const limit = parseInt((req.query.limit as string) || '20', 10);
  const q = (req.query.q as string) || '';
  const slug = (req.query.slug as string) || '';
  const filter: any = {};
  if (q) filter.title = { $regex: q, $options: 'i' };
  if (slug) filter.slug = slug;

  const [items, total] = await Promise.all([
    Blog.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Blog.countDocuments(filter),
  ]);

  res.json({ items, total, page, pages: Math.ceil(total / limit) });
}

export async function getBlog(req: Request, res: Response) {
  const item = await Blog.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Blog not found' });
  res.json(item);
}

export async function getBlogBySlug(req: Request, res: Response) {
  const item = await Blog.findOne({ slug: req.params.slug });
  if (!item) return res.status(404).json({ message: 'Blog not found' });
  res.json(item);
}

export async function createBlog(req: Request, res: Response) {
  const item = await Blog.create(req.body);
  res.status(201).json(item);
}

export async function updateBlog(req: Request, res: Response) {
  const item = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ message: 'Blog not found' });
  res.json(item);
}

export async function deleteBlog(req: Request, res: Response) {
  const item = await Blog.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: 'Blog not found' });
  res.status(204).send();
}

