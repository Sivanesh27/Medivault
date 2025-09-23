import React from 'react';
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex flex-col items-center p-8">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-blue-700 mb-6 drop-shadow-sm">
        🏥 Healthcare Dashboard
      </h1>
      <p className="text-gray-600 mb-10 text-center max-w-xl">
        Welcome to your personal healthcare hub. Access your profile, medical records, chatbot assistant, pharmacy, and more—all in one place.
      </p>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        <Link
          to="/profile"
          className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col items-center transition transform hover:-translate-y-1"
        >
          <span className="text-3xl mb-3">👤</span>
          <h2 className="text-xl font-semibold text-blue-600">Profile</h2>
          <p className="text-sm text-gray-500 text-center mt-2">View and manage your personal details.</p>
        </Link>

        <Link
          to="/records"
          className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col items-center transition transform hover:-translate-y-1"
        >
          <span className="text-3xl mb-3">📁</span>
          <h2 className="text-xl font-semibold text-green-600">Medical Records</h2>
          <p className="text-sm text-gray-500 text-center mt-2">Access your scans, prescriptions, and reports.</p>
        </Link>

        <Link
          to="/chatbot"
          className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col items-center transition transform hover:-translate-y-1"
        >
          <span className="text-3xl mb-3">💬</span>
          <h2 className="text-xl font-semibold text-purple-600">Chatbot</h2>
          <p className="text-sm text-gray-500 text-center mt-2">Get instant health guidance.</p>
        </Link>

        <Link
          to="/pharmacy"
          className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col items-center transition transform hover:-translate-y-1"
        >
          <span className="text-3xl mb-3">💊</span>
          <h2 className="text-xl font-semibold text-pink-600">Pharmacy</h2>
          <p className="text-sm text-gray-500 text-center mt-2">Order medicines and manage prescriptions.</p>
        </Link>

        <Link
          to="/consultation"
          className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col items-center transition transform hover:-translate-y-1"
        >
          <span className="text-3xl mb-3">🩺</span>
          <h2 className="text-xl font-semibold text-indigo-600">Online Consultation</h2>
          <p className="text-sm text-gray-500 text-center mt-2">Book and attend doctor consultations online.</p>
        </Link>

        <Link
          to="/symptom-analyzer"
          className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col items-center transition transform hover:-translate-y-1"
        >
          <span className="text-3xl mb-3">🧾</span>
          <h2 className="text-xl font-semibold text-orange-600">Symptom Analyzer</h2>
          <p className="text-sm text-gray-500 text-center mt-2">Analyze symptoms to get possible conditions.</p>
        </Link>

        <Link
          to="/medicine-reminders"
          className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col items-center transition transform hover:-translate-y-1"
        >
          <span className="text-3xl mb-3">⏰</span>
          <h2 className="text-xl font-semibold text-red-600">Medicine Reminders</h2>
          <p className="text-sm text-gray-500 text-center mt-2">Set and track your medication schedules.</p>
        </Link>

        <Link
          to="/report-analyzer"
          className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col items-center transition transform hover:-translate-y-1"
        >
          <span className="text-3xl mb-3">📊</span>
          <h2 className="text-xl font-semibold text-teal-600">Report Analyzer</h2>
          <p className="text-sm text-gray-500 text-center mt-2">Upload and get insights from reports.</p>
        </Link>

        <Link
          to="/disease-predictor"
          className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col items-center transition transform hover:-translate-y-1"
        >
          <span className="text-3xl mb-3">🔮</span>
          <h2 className="text-xl font-semibold text-yellow-600">Disease Predictor</h2>
          <p className="text-sm text-gray-500 text-center mt-2">AI-powered prediction based on health data.</p>
        </Link>

        <Link
          to="/health-insurance"
          className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col items-center transition transform hover:-translate-y-1"
        >
          <span className="text-3xl mb-3">🛡️</span>
          <h2 className="text-xl font-semibold text-cyan-600">Health Insurance</h2>
          <p className="text-sm text-gray-500 text-center mt-2">Apply for or claim your insurance.</p>
        </Link>
        
        <Link
          to="/food-recommendation"
          className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col items-center transition transform hover:-translate-y-1"
        >
          <span className="text-3xl mb-3">🥗</span>
          <h2 className="text-xl font-semibold text-lime-600">Food Recommendation</h2>
          <p className="text-sm text-gray-500 text-center mt-2">Get personalized nutrition advice.</p>
        </Link>

        <Link
          to="/nearby-hospitals"
          className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col items-center transition transform hover:-translate-y-1"
        >
          <span className="text-3xl mb-3">🏥</span>
          <h2 className="text-xl font-semibold text-gray-700">Nearby Hospitals</h2>
          <p className="text-sm text-gray-500 text-center mt-2">Find hospitals close to your location.</p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
