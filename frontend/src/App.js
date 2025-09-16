// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// ✅ Patient App Pages
import Home from './pages/Hm';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Records from './pages/Records';
import Chatbot from './pages/Chatbot';
import Pharmacy from './pages/Pharmacy';
import OnlineConsultation from './pages/OnlineConsultation';
import SymptomAnalyzer from './pages/SymptomAnalyzer';
import MedicineReminders from './pages/MedicineReminders';
import ReportAnalyzer from './pages/ReportAnalyzer';
import DiseasePredictor from './pages/DiseasePredictor';
import DiseaseEncyclopedia from './pages/DiseaseEncyclopedia';
import FoodRecommendation from './pages/FoodRecommendation';
import NearbyHospitals from './pages/NearbyHospitals';

// ✅ Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import PatientSearch from './pages/PatientSearch';
import UploadReports from './pages/UploadReports';
import Consultation from './pages/Consultation';
import Sessions from './pages/Sessions';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* ----- Patient App Routes ----- */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/records" element={<Records />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/consultation" element={<OnlineConsultation />} />
          <Route path="/symptom-analyzer" element={<SymptomAnalyzer />} />
          <Route path="/medicine-reminders" element={<MedicineReminders />} />
          <Route path="/report-analyzer" element={<ReportAnalyzer />} />
          <Route path="/disease-predictor" element={<DiseasePredictor />} />
          <Route path="/disease-encyclopedia" element={<DiseaseEncyclopedia />} />
          <Route path="/food-recommendation" element={<FoodRecommendation />} />
          <Route path="/nearby-hospitals" element={<NearbyHospitals />} />

          {/* ----- Admin Routes ----- */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />}>
            {/* Nested Routes for Admin Dashboard */}
            <Route index element={<Navigate to="patient-search" replace />} />
            <Route path="patient-search" element={<PatientSearch />} />
            <Route path="upload-reports" element={<UploadReports />} />
            <Route path="consultation" element={<Consultation />} />
            <Route path="sessions" element={<Sessions />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

