import express from 'express';
import * as ourValuesController from '../../../controllers/pages/homePage/ourValuesControllers.js';
import { protect } from '../../../middleware/authMiddleware.js';

const router = express.Router();

/*
    BASE PATH: /api/ourValues
*/

/* ---------------- CREATE ---------------- */
router.post('/', protect, ourValuesController.createOurValues);

/* ---------------- READ ---------------- */
router.get('/', ourValuesController.getOurValues);

/* ---------------- UPDATE ---------------- */
/* Full replace */
router.put('/:id', protect, ourValuesController.updateOurValues);

/* Partial update (recommended for editing single card/field) */
router.patch('/:id', protect, ourValuesController.updateOurValues);

/* ---------------- DELETE ---------------- */
router.delete('/:id', protect, ourValuesController.deleteOurValues);

export default router;