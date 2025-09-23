const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- THIS IS THE UPDATED FUNCTION ---
// It now accepts 'role' and includes it in the token payload.
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { // <-- THE FIX IS HERE
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/users/register
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password }); // Role defaults to 'patient'

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        // We now pass the user's role when generating the token
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/users/login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isMatch = user && (await bcrypt.compare(password, user.password));

    if (isMatch) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        // We now pass the user's role when generating the token
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

