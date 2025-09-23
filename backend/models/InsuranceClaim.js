// /backend/models/InsuranceClaim.js

const mongoose = require('mongoose');

const InsuranceClaimSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  policyNumber: {
    type: String,
    required: true,
  },
  claimType: {
    type: String,
    required: true,
    enum: ['Hospitalization', 'Accident', 'Critical Illness', 'Other'],
  },
  claimAmount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'Pending',
    enum: ['Pending', 'Approved', 'Rejected'],
  },
  submissionDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('InsuranceClaim', InsuranceClaimSchema);