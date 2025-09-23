// /backend/controllers/insuranceController.js

const InsuranceClaim = require('../models/InsuranceClaim');

// @desc    Submit a new insurance claim
// @route   POST /api/insurance/claims
exports.submitClaim = async (req, res) => {
  const { policyNumber, claimType, claimAmount, description } = req.body;
  
  // NOTE: In a real app, user ID would come from a decoded JWT token.
  // For simplicity, we'll assume it's passed in the body or hardcoded for now.
  // const userId = req.user.id; // From auth middleware (not built in this example)

  try {
    const newClaim = new InsuranceClaim({
      // user: userId, 
      policyNumber,
      claimType,
      claimAmount,
      description,
    });

    const claim = await newClaim.save();
    res.status(201).json(claim);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};