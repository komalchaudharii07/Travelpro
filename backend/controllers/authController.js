import crypto from 'crypto';
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
    const cleanContact = contact.includes('@') ? contact.toLowerCase().trim() : contact.trim();

    await Otp.deleteMany({ contact: cleanContact });
    await Otp.create({ contact: cleanContact, otp });

    if (cleanContact.includes('@')) {
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
        to: cleanContact,
        subject: 'Your OTP Code',
        text: `Your verification code is: ${otp}. It expires in 5 minutes.`,
        html: `<p>Your verification code is: <b>${otp}</b>. It expires in 5 minutes.</p>`,
      });
      console.log(`[Email Service] OTP email sent successfully to ${cleanContact}`);
    } else {
      console.log(`[SMS Service - Mock] Sending OTP ${otp} to phone ${cleanContact}`);
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

    const cleanContact = contact.includes('@') ? contact.toLowerCase().trim() : contact.trim();
    const otpRecord = await Otp.findOne({ contact: cleanContact, otp });
    if (!otpRecord) {
      res.status(400);
      throw new Error('Invalid or expired OTP');
    }

    // Delete OTP record immediately after validation
    await Otp.deleteOne({ _id: otpRecord._id });

    res.status(200).json({
      success: true,
      message: 'OTP verified successfully. Please provide registration details.',
      contact: cleanContact,
    });
  } catch (err) {
    next(err);
  }
};

// 3. Step 2: Finalize Registration (Collects username, password, and contact details)
export const completeOtpRegistration = async (req, res, next) => {
  try {
    const { username, email, password, phone } = req.body;
    const cleanEmail = email ? email.toLowerCase().trim() : undefined;
    const contactKey = cleanEmail || phone;

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
      userExists.username = username;
      userExists.password = password; // Triggers pre-save hash hook automatically
      if (cleanEmail) userExists.email = cleanEmail;
      if (phone) userExists.phone = phone;
      await userExists.save();
      user = userExists;
    } else {
      user = await User.create({
        username,
        email: cleanEmail,
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
    if (!email) {
      res.status(400);
      throw new Error('Email is required');
    }
    const cleanEmail = email.toLowerCase().trim();
    
    const userExists = await User.findOne({ email: cleanEmail });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({ username, email: cleanEmail, password, role: role || 'explorer' });
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

// 5. Traditional Login Controller (with debug logging)
export const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      res.status(400);
      throw new Error('Email is required');
    }
    const cleanEmail = email.toLowerCase().trim();
    console.log(`[Login Attempt] Looking up user with email: "${cleanEmail}"`);

    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      console.log(`[Login Error] User not found in database for email: "${cleanEmail}"`);
      res.status(401);
      throw new Error('Invalid email or password');
    }

    const isMatch = await user.matchPassword(password);
    console.log(`[Login Password Check] Password match result for ${cleanEmail}:`, isMatch);

    if (isMatch) {
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

// 6. Send Password Reset Link
export const sendResetLink = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400);
      throw new Error('Email is required');
    }
    const cleanEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      res.status(404);
      throw new Error('User not found with this email');
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 mins expiration
    await user.save();

    const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}&email=${cleanEmail}`;

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
      to: user.email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Use this link: ${resetUrl}`,
      html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 15 minutes.</p>`,
    });

    res.status(200).json({ success: true, message: 'Password reset link sent to email successfully.' });
  } catch (err) {
    next(err);
  }
};

// 7. Reset Password Handler (with debug logging)
export const resetPassword = async (req, res, next) => {
  try {
    const { email, token, password } = req.body;
    console.log(`[Reset Password] Attempting reset for email: "${email}"`);

    if (!email || !token || !password) {
      res.status(400);
      throw new Error('Email, token, and new password are required');
    }

    const cleanEmail = email.toLowerCase().trim();
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      email: cleanEmail,
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      console.log(`[Reset Password Error] Invalid or expired token for email: "${cleanEmail}"`);
      res.status(400);
      throw new Error('Invalid or expired password reset token');
    }

    user.password = password; // Pre-save hook hashes this automatically
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    console.log(`[Reset Password Success] Password successfully updated and hashed for ${cleanEmail}`);

    res.status(200).json({ success: true, message: 'Password reset successfully. You can now log in.' });
  } catch (err) {
    next(err);
  }
};