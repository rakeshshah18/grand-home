// src/routes/pages/homePage/aboutRoute.js
import express from 'express';
import {
    createAbout,
    getAllAbout,
    getAboutById,
    updateAbout,
    deleteAbout
} from '../../../controllers/pages/homePage/aboutController.js';
import { protect } from '../../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createAbout);
router.get('/', getAllAbout);
router.get('/:id', getAboutById);
router.put('/:id', protect, updateAbout);
router.delete('/:id', protect, deleteAbout);

export default router;