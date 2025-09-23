const mongoose = require('mongoose');
const bcrypt =require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Add role to distinguish between users
  role: {
    type: String,
    enum: ['patient', 'admin'],
    default: 'patient',
  },
  // You can add more patient-specific fields here later
  // e.g., dateOfBirth, address, etc.
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);
