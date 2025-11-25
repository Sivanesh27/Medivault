// src/pages/AdminDashboard.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <Sidebar />
      {/* Main Content Area */}
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet /> {/* Render the selected admin page here */}
      </main>
    </div>
  );
};

export default AdminDashboard;
