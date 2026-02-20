import express from 'express';
import { getGetInTouch, updateGetInTouch } from '../../../controllers/pages/contact/getInTouchController.js';

const router = express.Router();

router.get('/', getGetInTouch);
router.put('/', updateGetInTouch); // Assuming we are updating the entire resource/singleton

export default router;
