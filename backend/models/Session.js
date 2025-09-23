const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  // The patient attending the session
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  // The admin/doctor conducting the session
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  topic: {
    type: String,
    required: true,
    trim: true,
  },
  sessionDate: {
    type: Date,
    required: true,
  },
  // Could be a link to Google Meet, Zoom, etc.
  meetingLink: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    enum: ['Scheduled', 'Completed', 'Cancelled'],
    default: 'Scheduled',
  },
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Session', SessionSchema);
