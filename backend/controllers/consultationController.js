// backend/controllers/consultationController.js
const Session = require("../models/Session");

exports.scheduleSession = async (req, res) => {
  try {
    const { patientId, doctorId, date, notes } = req.body;

    const session = new Session({ patient: patientId, doctor: doctorId, date, notes });
    await session.save();

    res.json({ msg: "Session scheduled successfully", session });
  } catch (error) {
    res.status(500).json({ msg: "Error scheduling session", error: error.message });
  }
};

exports.getSessionsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const sessions = await Session.find({ patient: patientId }).populate("doctor", "name email");
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching sessions", error: error.message });
  }
};
