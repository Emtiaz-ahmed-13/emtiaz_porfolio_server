import { Router } from 'express';
import { listBlogs, getBlog, getBlogBySlug, createBlog, updateBlog, deleteBlog } from '../controllers/blogController';

const router = Router();

router.get('/', listBlogs);
router.get('/slug/:slug', getBlogBySlug);
router.get('/:id', getBlog);
router.post('/', createBlog);
router.patch('/:id', updateBlog);
router.delete('/:id', deleteBlog);

export default router;

