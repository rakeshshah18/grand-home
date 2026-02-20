import express from 'express';
import blogsController from '../../../controllers/pages/blogs/blogsController.js';

const router = express.Router();

router.post('/', blogsController.createBlog);
router.get('/', blogsController.getAllBlogs);
router.get('/:slug', blogsController.getBlogBySlug);
router.put('/:id', blogsController.updateBlog);
router.delete('/:id', blogsController.deleteBlog);

export default router;
