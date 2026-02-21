import express from 'express';
import featuresController from '../../../controllers/pages/homePage/featuresController.js';
import { protect } from '../../../middleware/authMiddleware.js';

const router = express.Router();

/*
    BASE PATH: /api/features
*/

/* ---------------- CREATE ---------------- */
router.post('/', protect, featuresController.createFeatures);

/* ---------------- READ ---------------- */
router.get('/', featuresController.getAllFeatures);
router.get('/:id', featuresController.getFeaturesById);

/* ---------------- UPDATE ---------------- */
/* Full replace */
router.put('/:id', protect, featuresController.updateFeatures);

/* Partial update (recommended for editing single card/field) */
router.patch('/:id', protect, featuresController.updateFeatures);

/* ---------------- DELETE ---------------- */
router.delete('/:id', protect, featuresController.deleteFeatures);

export default router;
