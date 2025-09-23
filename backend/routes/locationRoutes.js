const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Import your authentication middleware
const { findNearbyHospitals } = require('../controllers/locationController');

/**
 * @route   POST /api/location/hospitals
 * @desc    Find hospitals near a user's given coordinates using a real-time search tool.
 * @access  Private (ensures only logged-in users can access this feature)
 */
router.post('/hospitals', protect, findNearbyHospitals);

module.exports = router;

