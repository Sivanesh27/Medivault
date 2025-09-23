import React from 'react';
import { NavLink } from 'react-router-dom';

// This component is now ONLY the sidebar navigation menu.
// It no longer contains an <Outlet/>, which fixes the duplication issue.
const Sidebar = () => {
  // Styles for active and inactive navigation links for better UX
  const activeLinkStyle = "bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium";
  const normalLinkStyle = "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium";

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6 text-center">Admin Menu</h2>
      <nav className="flex flex-col space-y-2">
        <NavLink 
          to="/admin-dashboard/patient-search" 
          className={({ isActive }) => isActive ? activeLinkStyle : normalLinkStyle}
        >
          Patient Search
        </NavLink>
        <NavLink 
          to="/admin-dashboard/upload-reports" 
          className={({ isActive }) => isActive ? activeLinkStyle : normalLinkStyle}
        >
          Upload Reports
        </NavLink>
        <NavLink 
          to="/admin-dashboard/consultation" 
          className={({ isActive }) => isActive ? activeLinkStyle : normalLinkStyle}
        >
          Consultation
        </NavLink>
        <NavLink 
          to="/admin-dashboard/sessions" 
          className={({ isActive }) => isActive ? activeLinkStyle : normalLinkStyle}
        >
          Sessions
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;

