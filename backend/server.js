const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); // Make sure you have this line
require('dotenv').config();

// Connect to Database
connectDB();

const app = express();

// --- THIS IS THE FIX ---
// Set up CORS Options to allow requests only from your frontend
const corsOptions = {
  origin: 'http://localhost:3000', 
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions)); // Use the cors middleware with your specific options

// Init Middleware to accept JSON data
app.use(express.json({ extended: false }));

// Define Routes
app.get('/', (req, res) => res.send('API Running'));

// --- Main App Routes ---
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/records', require('./routes/recordRoutes'));
app.use('/api/insurance', require('./routes/insuranceRoutes'));
app.use('/api/analysis', require('./routes/analysisRoutes'));
app.use('/api/consultations', require('./routes/consultationRoutes'));
app.use('/api/chatbot', require('./routes/chatbotRoutes'));
app.use('/api/sessions', require('./routes/sessionRoutes'));
app.use('/api/pharmacy', require('./routes/pharmacyRoutes'));
app.use('/api/location', require('./routes/locationRoutes'));
app.use('/api/reminders', require('./routes/reminderRoutes'));

// --- Admin Routes ---
app.use('/api/admin', require('./routes/adminRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
