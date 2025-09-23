const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getMedicines, placeOrder } = require('../controllers/pharmacyController');

// @route   GET /api/pharmacy/medicines
// @desc    Get a list of all medicines
// @access  Private
router.get('/medicines', protect, getMedicines);

// @route   POST /api/pharmacy/order
// @desc    Submit a new pharmacy order
// @access  Private
router.post('/order', protect, placeOrder);

module.exports = router;