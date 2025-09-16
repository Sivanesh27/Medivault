const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  scans: [
    {
      type: { type: String },
      imageUrl: String,
      date: { type: Date, default: Date.now },
      notes: String
    }
  ],

  prescriptions: [
    {
      doctor: String,
      medicines: [{ name: String, dosage: String, duration: String }],
      date: { type: Date, default: Date.now }
    }
  ],

  bills: [
    {
      hospitalName: String,
      amount: Number,
      date: { type: Date, default: Date.now },
      pdfUrl: String
    }
  ],

  implants: [
    {
      implantType: String,
      serialNumber: String,
      manufacturer: String,
      dateImplanted: Date,
      hospital: String
    }
  ]
});

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);
