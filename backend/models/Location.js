import mongoose from 'mongoose';

const hotspotSchema = new mongoose.Schema({
  pitch: { type: Number, required: true }, // Vertical coordinate in 360 space
  yaw: { type: Number, required: true },   // Horizontal coordinate in 360 space
  label: { type: String, required: true },
  targetViewId: { type: mongoose.Schema.Types.ObjectId } // Links to another view node
});

const viewSchema = new mongoose.Schema({
  viewTitle: { type: String, required: true },
  iframeUrl: { type: String, required: true },
  description: { type: String },
  hotspots: [hotspotSchema]
});

const locationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true }, // e.g., "Cherrapunji"
  mainDescription: { type: String, required: true },
  image: { type: String, required: true }, // Thumbnail URL for cards
  mapCoordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  views: [viewSchema] // Using the defined viewSchema to include hotspots!
}, {
  timestamps: true
});

const Location = mongoose.model('Location', locationSchema);

export default Location;