import Location from '../models/Location.js';
import { initialLocations } from '../data/seedData.js';

export const seedLocations = async (req, res) => {
  try {
    await Location.deleteMany({});
    const insertedLocations = await Location.insertMany(initialLocations);
    res.json({ message: "Hierarchical database seeded successfully", insertedLocations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLocations = async (req, res) => {
  try {
    const locations = await Location.find({});
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.json(location);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createLocation = async (req, res) => {
  try {
    const { title, mainDescription, mapCoordinates, views } = req.body;
    const newLocation = new Location({ title, mainDescription, mapCoordinates, views });
    const savedLocation = await newLocation.save();
    res.status(201).json(savedLocation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};