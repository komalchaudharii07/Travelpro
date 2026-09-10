import express from 'express';
import { 
  seedLocations, 
  getLocations, 
  getLocationById, 
  createLocation 
} from '../controllers/locationController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getLocations);

// STATIC routes like '/seed' MUST come BEFORE dynamic parameters like '/:id'
// Otherwise, Express will treat the word "seed" as an ID and fail to find it.
router.get('/seed', protect, adminOnly, seedLocations);

// Public route for specific location by ID
router.get('/:id', getLocationById);

// Protected & Admin-only routes
router.post('/', protect, adminOnly, createLocation);

export default router;