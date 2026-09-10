import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  contact: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 } // Auto-deletes after 300 seconds
});

const Otp = mongoose.model('Otp', otpSchema);
export default Otp;