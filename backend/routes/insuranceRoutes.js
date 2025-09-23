// /backend/routes/insuranceRoutes.js

const express = require('express');
const router = express.Router();
const { submitClaim } = require('../controllers/insuranceController');

// We would add authentication middleware here in a real app
// const { protect } = require('../middleware/authMiddleware');
// router.route('/claims').post(protect, submitClaim);

router.post('/claims', submitClaim);

module.exports = router;