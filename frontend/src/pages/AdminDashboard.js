import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // Ensure this path and filename are correct

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* The Sidebar component is rendered here as part of the layout. */}
      <Sidebar />

      {/* The main content area where the child routes will be displayed. */}
      <main className="flex-1 p-6">
        {/* This is the single, correct Outlet for the admin content. */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;