const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { getRecords, uploadRecord } = require('../controllers/recordController');

// Patient Route: Get their own records
router.route('/').get(protect, getRecords);

// Admin Route: Upload a record for a patient
router.route('/').post(protect, admin, upload.single('reportFile'), uploadRecord);

module.exports = router;
