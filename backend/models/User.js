import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    unique: true, 
    sparse: true, // Allows multiple documents to have null/undefined values
    lowercase: true 
  },
  phone: { 
    type: String, 
    unique: true, 
    sparse: true 
  },
  password: { 
    type: String, 
    minlength: 6,
    required: function() {
      // Password is only required if it's a traditional signup (not purely OTP)
      return this.password != null && this.password !== '';
    }
  },
  role: { type: String, enum: ['explorer', 'admin'], default: 'explorer' },
  savedItineraries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }]
}, { timestamps: true });

// Hash password before saving to database (only if modified or exists)
userSchema.pre('save', async function() {
  if (!this.isModified('password') || !this.password) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method for login
userSchema.methods.matchPassword = async function(enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;