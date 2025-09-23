const User = require('../models/User');

// @desc    Search for patients
// @route   GET /api/admin/patients?search=...
exports.searchPatients = async (req, res) => {
  const keyword = req.query.search
    ? {
        // Search by name or email, case-insensitive
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { email: { $regex: req.query.search, $options: 'i' } },
        ],
        role: 'patient' // Ensure we only search for patients
      }
    : {};

  try {
    const users = await User.find(keyword).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get user profile by ID (for admin)
// @route   GET /api/admin/users/:id
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
