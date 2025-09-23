const mongoose = require('mongoose');

const MedicalRecordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  recordType: {
    type: String,
    required: true,
    enum: ['Prescription', 'Lab Report', 'Scan', 'Bill', 'Note'],
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  // In a real app, you would store a URL to the file in a cloud storage (like AWS S3)
  fileUrl: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('MedicalRecord', MedicalRecordSchema);
