import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
        <nav className="flex flex-col space-y-2">
          <NavLink to="/admin-dashboard/patient-search">Patient Search</NavLink>
          <NavLink to="/admin-dashboard/upload-reports">Upload Reports</NavLink>
          <NavLink to="/admin-dashboard/consultation">Consultation</NavLink>
          <NavLink to="/admin-dashboard/sessions">Sessions</NavLink>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;
