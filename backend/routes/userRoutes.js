import express from 'express';
import { toggleBookmark, getMyItinerary } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/itinerary')
  .get(protect, getMyItinerary)
  .post(protect, toggleBookmark);

export default router;