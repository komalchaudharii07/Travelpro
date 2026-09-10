import User from '../models/User.js';
import Otp from '../models/Otp.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// 1. Send OTP Controller
export const sendOtp = async (req, res, next) => {
  try {
    const { contact } = req.body;
    if (!contact) {
      res.status(400);
      throw new Error('Phone number or email is required');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.deleteMany({ contact });
    await Otp.create({ contact, otp });

    if (contact.includes('@')) {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"CloudWalker" <${process.env.EMAIL_USER}>`,
        to: contact,
        subject: 'Your OTP Code',
        text: `Your verification code is: ${otp}. It expires in 5 minutes.`,
        html: `<p>Your verification code is: <b>${otp}</b>. It expires in 5 minutes.</p>`,
      });
      console.log(`[Email Service] OTP email sent successfully to ${contact}`);
    } else {
      console.log(`[SMS Service - Mock] Sending OTP ${otp} to phone ${contact}`);
    }

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
    next(err);
  }
};

// 2. Step 1: Verify OTP only (Does NOT register or log in yet)
export const verifyOtpOnly = async (req, res, next) => {
  try {
    const { contact, otp } = req.body;

    if (!contact || !otp) {
      res.status(400);
      throw new Error('Contact and OTP are required');
    }

    const otpRecord = await Otp.findOne({ contact, otp });
    if (!otpRecord) {
      res.status(400);
      throw new Error('Invalid or expired OTP');
    }

    // Delete OTP record immediately after validation
    await Otp.deleteOne({ _id: otpRecord._id });

    res.status(200).json({
      success: true,
      message: 'OTP verified successfully. Please provide registration details.',
      contact,
    });
  } catch (err) {
    next(err);
  }
};

// 3. Step 2: Finalize Registration (Collects username, email/phone, password)
// 3. Step 2: Finalize Registration (Updates the user with username & password)
// 3. Step 2: Finalize Registration (Saves/Updates user with username, password, and contact)
// 3. Step 2: Finalize Registration (Collects username, password, and contact details)
export const completeOtpRegistration = async (req, res, next) => {
  try {
    const { username, email, password, phone } = req.body;
    const contactKey = email || phone;

    if (!username || !password || !contactKey) {
      res.status(400);
      throw new Error('Please provide username, password, and contact details');
    }

    // Check if a user with this email/phone is already fully registered
    const userExists = await User.findOne({ $or: [{ email: contactKey }, { phone: contactKey }] });
    if (userExists && userExists.password) {
      res.status(400);
      throw new Error('An account already exists with this email or phone. Please log in.');
    }

    // Check if username is taken
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      res.status(400);
      throw new Error('Username is already taken');
    }

    let user;
    if (userExists) {
      // If a placeholder row somehow exists, update it with password & username
      userExists.username = username;
      userExists.password = password; // Triggers pre-save hash hook automatically
      if (email) userExists.email = email;
      if (phone) userExists.phone = phone;
      await userExists.save();
      user = userExists;
    } else {
      // Create brand new user record cleanly
      user = await User.create({
        username,
        email: email || undefined,
        phone: phone || undefined,
        password, // Triggers pre-save hash hook automatically
        role: 'explorer',
      });
    }

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    next(err);
  }
};
// 4. Traditional Register Controller
export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({ username, email, password, role: role || 'explorer' });
    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (err) {
    next(err);
  }
};

// 5. Traditional Login Controller
export const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (err) {
    next(err);
  }
};