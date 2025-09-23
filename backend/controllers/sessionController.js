const Session = require('../models/Session');
const User = require('../models/User');

// @desc    Schedule a new session (Admin only)
// @route   POST /api/sessions
exports.scheduleSession = async (req, res) => {
  const { patientId, topic, sessionDate, meetingLink } = req.body;

  try {
    // Check if the patient exists
    const patient = await User.findById(patientId);
    if (!patient || patient.role !== 'patient') {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const newSession = new Session({
      patient: patientId,
      admin: req.user.id, // The logged-in admin is conducting the session
      topic,
      sessionDate,
      meetingLink,
    });

    const session = await newSession.save();
    res.status(201).json(session);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all sessions for the logged-in user (Patient or Admin)
// @route   GET /api/sessions
exports.getSessions = async (req, res) => {
  try {
    let sessions;
    if (req.user.role === 'admin') {
      // Admin gets sessions they are conducting
      sessions = await Session.find({ admin: req.user.id }).populate('patient', 'name email');
    } else {
      // Patient gets their own sessions
      sessions = await Session.find({ patient: req.user.id }).populate('admin', 'name email');
    }
    res.json(sessions);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a session's status (Admin only)
// @route   PUT /api/sessions/:id
exports.updateSessionStatus = async (req, res) => {
    const { status } = req.body;
    try {
        let session = await Session.findById(req.params.id);

        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        // Ensure the admin trying to update is the one conducting the session
        if(session.admin.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        session.status = status;
        await session.save();
        res.json(session);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};
