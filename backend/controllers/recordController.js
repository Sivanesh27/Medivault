const MedicalRecord = require('../models/MedicalRecord');

// @desc    Get all medical records for a user
// @route   GET /api/records
exports.getRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find({ user: req.user.id });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a medical record
// @route   POST /api/records
exports.createRecord = async (req, res) => {
  const { recordType, title, description, fileUrl } = req.body;
  try {
    const newRecord = new MedicalRecord({
      user: req.user.id,
      recordType,
      title,
      description,
      fileUrl // This would be the URL from your file upload service
    });
    const record = await newRecord.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Upload a new medical record for a specific patient (Admin)
// @route   POST /api/records
exports.uploadRecord = async (req, res) => {
  const { patientId, recordType, details } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'Please upload a file' });
  }

  try {
    const record = new MedicalRecord({
      user: patientId, // Assign record to the selected patient
      recordType,
      details,
      fileUrl: `/uploads/${req.file.filename}`, // Path where the file is stored
      uploadedBy: req.user.id, // ID of the admin who uploaded it
    });

    const createdRecord = await record.save();
    res.status(201).json(createdRecord);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};