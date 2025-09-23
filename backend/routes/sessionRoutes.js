const express = require('express');
const router = express.Router();
const {
  scheduleSession,
  getSessions,
  updateSessionStatus
} = require('../controllers/sessionController');
const { protect, admin } = require('../middleware/authMiddleware');

// Route to get all sessions for the currently logged-in user (works for both patient and admin)
router.get('/', protect, getSessions);

// Route for an admin to schedule a new session
router.post('/', protect, admin, scheduleSession);

// Route for an admin to update a session's status (e.g., mark as 'Completed')
router.put('/:id', protect, admin, updateSessionStatus);

module.exports = router;
