import express from 'express';
import authController from '../../controllers/auth/authController.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/verify-otp', authController.verifyOtp);
router.post('/login', authController.login);
router.get('/profile', protect, authController.getProfile);

export default router;
