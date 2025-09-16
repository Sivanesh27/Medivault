import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';      // Tailwind + custom styles
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create the root React element
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Wrapper for a simple background and smooth font rendering */}
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-800">
      <App />
    </div>
  </React.StrictMode>
);

// Optional: measure performance (e.g., send to analytics)
reportWebVitals();
