import express from 'express';
import { createAbout, getAbout, updateAbout, upsertAbout, deleteAbout } from '../../../controllers/pages/aboutPage/aboutController.js';

const router = express.Router();

router.route('/')
    .get(getAbout)
    .post(createAbout)
    .put(updateAbout)      
    .delete(deleteAbout);   

router.put('/upsert', upsertAbout);       
router.route('/:id')
    .put(updateAbout)      
    .delete(deleteAbout);

export default router;