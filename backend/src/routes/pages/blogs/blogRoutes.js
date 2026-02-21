import express from 'express';
import blogsController from '../../../controllers/pages/blogs/blogsController.js';
import { protect } from '../../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, blogsController.createBlog);
router.get('/', blogsController.getAllBlogs);
router.get('/:slug', blogsController.getBlogBySlug);
router.put('/:id', protect, blogsController.updateBlog);
router.delete('/:id', protect, blogsController.deleteBlog);

export default router;
