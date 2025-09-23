const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// This is the corrected line.
// It imports all four required functions in a single, clean statement.
const { 
    analyzeSymptoms, 
    predictDisease, 
    analyzeReport,
    getFoodRecommendations 
} = require('../controllers/analysisController');

// Define the routes and connect them to the controller functions
router.post('/symptoms', protect, analyzeSymptoms);
router.post('/predict', protect, predictDisease);

// This route now correctly uses the multer middleware for file uploads
router.post('/report', protect, upload.single('reportFile'), analyzeReport);

router.post('/food', protect, getFoodRecommendations);

module.exports = router;
