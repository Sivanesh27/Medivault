// /backend/controllers/chatbotController.js

exports.handleChat = (req, res) => {
  const { message } = req.body;
  const userMessage = message.toLowerCase();
  let botResponse = "I'm sorry, I don't understand that. You can ask me about symptoms, appointments, or pharmacy hours.";

  if (userMessage.includes('hello') || userMessage.includes('hi')) {
    botResponse = 'Hello! How can I help you today?';
  } else if (userMessage.includes('symptom')) {
    botResponse = 'Please use the Symptom Analyzer tool from the dashboard for an initial assessment.';
  } else if (userMessage.includes('appointment')) {
    botResponse = 'You can book an appointment through the Online Consultation page on your dashboard.';
  } else if (userMessage.includes('pharmacy') || userMessage.includes('medicine')) {
    botResponse = 'Our online pharmacy is available 24/7. You can access it from the dashboard.';
  } else if (userMessage.includes('goodbye') || userMessage.includes('bye')) {
    botResponse = 'Goodbye! Take care.';
  }

  res.json({ reply: botResponse });
};