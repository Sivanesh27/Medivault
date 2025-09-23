const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// This is the corrected line.
// It now imports all three required functions from the controller.
const { 
    registerUser, 
    loginUser, 
    getUserProfile 
} = require('../controllers/userController');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route - only accessible by logged-in users
// This route now correctly uses the imported getUserProfile function.
router.get('/profile', protect, getUserProfile);

module.exports = router;