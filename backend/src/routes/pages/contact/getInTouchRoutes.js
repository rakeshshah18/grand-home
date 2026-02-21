import express from 'express';
import { getGetInTouch, updateGetInTouch } from '../../../controllers/pages/contact/getInTouchController.js';
import { protect } from '../../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getGetInTouch);
router.put('/', protect, updateGetInTouch); // Assuming we are updating the entire resource/singleton

export default router;
