const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  medicine: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
  },
  time: {
    type: String, // e.g., "09:00 AM"
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Reminder', ReminderSchema);
