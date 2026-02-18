import express from 'express';
import * as ourValuesController from '../../../controllers/pages/homePage/ourValuesControllers.js';

const router = express.Router();

/*
    BASE PATH: /api/ourValues
*/

/* ---------------- CREATE ---------------- */
router.post('/', ourValuesController.createOurValues);

/* ---------------- READ ---------------- */
router.get('/', ourValuesController.getOurValues);

/* ---------------- UPDATE ---------------- */
/* Full replace */
router.put('/:id', ourValuesController.updateOurValues);

/* Partial update (recommended for editing single card/field) */
router.patch('/:id', ourValuesController.updateOurValues);

/* ---------------- DELETE ---------------- */
router.delete('/:id', ourValuesController.deleteOurValues);

export default router;