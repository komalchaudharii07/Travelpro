import express from 'express';
import { 
  sendOtp, 
  verifyOtpOnly, 
  completeOtpRegistration, 
  authUser, 
  registerUser,
  sendResetLink,
  resetPassword // <-- Added this missing import
} from '../controllers/authController.js';

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtpOnly);
router.post('/complete-registration', completeOtpRegistration);
router.post('/login', authUser);
router.post('/register', registerUser);
router.post('/forgot-password', sendResetLink);
router.post('/reset-password', resetPassword);

export default router;