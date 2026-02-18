// src/routes/pages/homePage/aboutRoute.js
import express from 'express';
import {
    createAbout,
    getAllAbout,
    getAboutById,
    updateAbout,
    deleteAbout
} from '../../../controllers/pages/homePage/aboutController.js';

const router = express.Router();

router.post('/', createAbout);
router.get('/', getAllAbout);
router.get('/:id', getAboutById);
router.put('/:id', updateAbout);
router.delete('/:id', deleteAbout);

export default router;