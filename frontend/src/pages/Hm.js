import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center px-4">
      {/* Title */}
      <h1 className="text-5xl font-extrabold text-blue-700 drop-shadow-sm mb-4 text-center">
        Welcome to <span className="text-blue-500">MediVault</span>
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-lg text-center mb-10 max-w-2xl">
        Your secure and reliable healthcare record management system.  
        Easily access your medical records, connect with your healthcare team, and stay on top of your health.
      </p>

      {/* Navigation Buttons */}
      <nav className="flex flex-wrap gap-6 justify-center">
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition transform hover:-translate-y-1"
        >
          Patient Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 transition transform hover:-translate-y-1"
        >
          Register
        </Link>
        <Link
          to="/dashboard"
          className="px-6 py-3 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 transition transform hover:-translate-y-1"
        >
          Patient Dashboard
        </Link>
        <Link
          to="/admin-login"
          className="px-6 py-3 bg-red-600 text-white rounded-xl shadow-md hover:bg-red-700 transition transform hover:-translate-y-1"
        >
          Admin Login
        </Link>
      </nav>

      {/* Footer */}
      <footer className="mt-12 text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} MediVault. All rights reserved. <br />
        <span className="text-gray-400">
          Patients and admins can log in using their respective portals.
        </span>
      </footer>
    </div>
  );
}

export default Home;
