import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import locationRoutes from './routes/locationRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import reviewRoutes from './routes/reviewRoutes.js';
dotenv.config();

const app = express();

// Security and Logging Middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Rate Limiter to prevent API abuse/DoS attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api/', limiter);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Mount Routes
app.use('/api/locations', locationRoutes);
app.use('/api/users', authRoutes);
app.use('/api/users', userRoutes); // Mounted here so /api/users/itinerary is active
app.use('/api/locations/:locationId/reviews', reviewRoutes);
// Centralized Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Secure Server running on port ${PORT}`));