const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Import the controller functions
const { 
    getReminders, 
    toggleReminder 
} = require('../controllers/reminderController');

// @route   GET /api/reminders
// @desc    Get all reminders for the logged-in user
// @access  Private
router.route('/').get(protect, getReminders);

// @route   PUT /api/reminders/:id/toggle
// @desc    Toggle the active status of a reminder
// @access  Private
router.route('/:id/toggle').put(protect, toggleReminder);

// This is the crucial line that was missing.
// It exports the router so server.js can use it.
module.exports = router;
