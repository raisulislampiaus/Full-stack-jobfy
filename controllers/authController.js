const mongoose = require('mongoose');
const expressAsyncHandler = require('express-async-handler');
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

// Zod schemas for request validation
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['admin', 'super-admin']).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Helper function to handle Zod errors
const handleZodError = (error) => {
  return error.errors.map((err) => ({
    path: err.path.join('.'),
    message: err.message,
  }));
};

// Register route
exports.register = expressAsyncHandler(async (req, res) => {
  try {
    const { email, password, role } = registerSchema.parse(req.body);

    // Check for existing user with the same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: 'User created' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: handleZodError(error) });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

// Login route
exports.login = expressAsyncHandler(async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET
      );
      res.json({
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: handleZodError(error) });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});
