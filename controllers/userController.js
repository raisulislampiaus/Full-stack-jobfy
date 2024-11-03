const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { z } = require('zod');
const expressAsyncHandler = require('express-async-handler');

// Zod schema for validation
const createAdminSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const updateAdminSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});

// Helper function to handle Zod errors
const handleZodError = (error) => {
  return error.errors.map((err) => ({
    path: err.path.join('.'),
    message: err.message,
  }));
};

// Create a new admin user (only by super-admin)
exports.createAdmin = expressAsyncHandler(async (req, res) => {
  if (req.user.role !== 'super-admin') {
    return res.status(403).json({ error: 'Only super-admins can create admin users' });
  }

  const { email, password } = createAdminSchema.parse(req.body);

  // Check for existing admin with the same email
  const existingAdmin = await User.findOne({ email });
  if (existingAdmin) {
    return res.status(400).json({ error: 'Email already in use' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await User.create({ email, password: hashedPassword, role: 'admin' });

  res.status(201).json(admin);
});

// Update an admin user
exports.updateAdmin = expressAsyncHandler(async (req, res) => {
  const updates = updateAdminSchema.parse(req.body);

  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }

  const { userId } = req.params;
  const admin = await User.findByIdAndUpdate(userId, updates, { new: true });

  if (!admin) {
    return res.status(404).json({ error: 'Admin user not found' });
  }

  res.json(admin);
});

// Delete an admin user
exports.deleteAdmin = expressAsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const admin = await User.findByIdAndDelete(userId);

  if (!admin) {
    return res.status(404).json({ error: 'Admin user not found' });
  }

  res.status(204).json({ message: 'Admin deleted successfully' });
});

exports.getAllAdmins = expressAsyncHandler(async (req, res) => {
  const admins = await User.find({ role: 'admin' });
  res.status(200).json(admins);
});