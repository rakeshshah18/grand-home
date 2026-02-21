import express from 'express';
import { createAbout, getAbout, updateAbout, upsertAbout, deleteAbout } from '../../../controllers/pages/aboutPage/aboutController.js';
import { protect } from '../../../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getAbout)
    .post(protect, createAbout)
    .put(protect, updateAbout)
    .delete(protect, deleteAbout);

router.put('/upsert', protect, upsertAbout);
router.route('/:id')
    .put(protect, updateAbout)
    .delete(protect, deleteAbout);

export default router;