import express from 'express';
import featuresController from '../../../controllers/pages/homePage/featuresController.js';

const router = express.Router();

/*
    BASE PATH: /api/features
*/

/* ---------------- CREATE ---------------- */
router.post('/', featuresController.createFeatures);

/* ---------------- READ ---------------- */
router.get('/', featuresController.getAllFeatures);
router.get('/:id', featuresController.getFeaturesById);

/* ---------------- UPDATE ---------------- */
/* Full replace */
router.put('/:id', featuresController.updateFeatures);

/* Partial update (recommended for editing single card/field) */
router.patch('/:id', featuresController.updateFeatures);

/* ---------------- DELETE ---------------- */
router.delete('/:id', featuresController.deleteFeatures);

export default router;
