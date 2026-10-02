import express from 'express';
import { addReview, getReviewsByLocation } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router({ mergeParams: true });

router.route('/')
  .get(getReviewsByLocation)
  .post(protect, addReview);

export default router;