const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uniqueId: { type: String, required: true, unique: true }, 
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  phone: String,
  dob: Date,
  gender: String,
  bloodGroup: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
