import Review from '../models/Review.js';
import Location from '../models/Location.js';

export const addReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const { locationId } = req.params;

    const location = await Location.findById(locationId);
    if (!location) {
      res.status(404);
      throw new Error('Location not found');
    }

    const alreadyReviewed = await Review.findOne({ user: req.user._id, location: locationId });
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('You have already reviewed this location');
    }

    const review = await Review.create({
      user: req.user._id,
      location: locationId,
      rating: Number(rating),
      comment
    });

    res.status(201).json({ message: 'Review added successfully', review });
  } catch (err) {
    next(err);
  }
};

export const getReviewsByLocation = async (req, res, next) => {
  try {
    const reviews = await Review.find({ location: req.params.locationId }).populate('user', 'username');
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};