const Reminder = require('../models/Reminder');

// @desc    Get all reminders for a specific user
// @route   GET /api/reminders
exports.getReminders = async (req, res) => {
  try {
    // req.user.id comes from the 'protect' middleware
    const reminders = await Reminder.find({ user: req.user.id });
    res.json(reminders);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Toggle the active status of a reminder
// @route   PUT /api/reminders/:id/toggle
exports.toggleReminder = async (req, res) => {
    try {
        const reminder = await Reminder.findById(req.params.id);

        if (!reminder) {
            return res.status(404).json({ message: 'Reminder not found' });
        }

        // Check if the reminder belongs to the user trying to modify it
        if (reminder.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        // Toggle the active status and save
        reminder.active = !reminder.active;
        await reminder.save();

        res.json(reminder);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};
