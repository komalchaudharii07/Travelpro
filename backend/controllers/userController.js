import User from '../models/User.js';

// Toggle bookmark / add to personal itinerary
export const toggleBookmark = async (req, res, next) => {
  try {
    const { locationId } = req.body;
    const user = await User.findById(req.user._id);

    const isBookmarked = user.savedItineraries.includes(locationId);

    if (isBookmarked) {
      // Remove if already saved
      user.savedItineraries = user.savedItineraries.filter(
        (id) => id.toString() !== locationId
      );
      await user.save();
      res.json({ message: "Location removed from itinerary", savedItineraries: user.savedItineraries });
    } else {
      // Add if not saved
      user.savedItineraries.push(locationId);
      await user.save();
      res.json({ message: "Location added to itinerary", savedItineraries: user.savedItineraries });
    }
  } catch (err) {
    next(err);
  }
};

// Get user's saved itineraries
export const getMyItinerary = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('savedItineraries');
    res.json(user.savedItineraries);
  } catch (err) {
    next(err);
  }
};