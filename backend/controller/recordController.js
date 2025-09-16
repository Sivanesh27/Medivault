const express = require("express");
const MedicalRecord = require("../models/MedicalRecord");

const router = express.Router();

// Get user medical records
router.get("/:userId", async (req, res) => {
  try {
    const records = await MedicalRecord.findOne({ userId: req.params.userId }).populate("userId");
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add/update records (only admin later)
router.post("/", async (req, res) => {
  try {
    const { userId, scans, prescriptions, bills, implants } = req.body;

    let record = await MedicalRecord.findOne({ userId });

    if (!record) {
      record = new MedicalRecord({ userId, scans, prescriptions, bills, implants });
    } else {
      if (scans) record.scans.push(...scans);
      if (prescriptions) record.prescriptions.push(...prescriptions);
      if (bills) record.bills.push(...bills);
      if (implants) record.implants.push(...implants);
    }

    await record.save();
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
