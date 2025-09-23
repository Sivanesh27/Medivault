const express = require('express');
const router = express.Router();
const { searchPatients, getUserById } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

// All routes are protected and require admin access
router.get('/patients', protect, admin, searchPatients);
router.get('/users/:id', protect, admin, getUserById);

module.exports = router;