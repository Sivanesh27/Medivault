import React, { useState, useEffect, useCallback } from "react";

function PatientSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false); // To track if a search has been attempted

  // Debounce function to prevent API calls on every keystroke
  // useCallback ensures the debounce function is not recreated on every render
  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (query.length < 2) {
        setResults([]);
        setHasSearched(false);
        return;
      }
      
      setLoading(true);
      setError("");
      setHasSearched(true);

      // --- THIS IS THE FIX ---
      // Admin token is stored as 'adminToken', not 'userToken'
      const token = localStorage.getItem('adminToken'); 
      if (!token) {
        setError("Admin authorization token not found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/api/admin/patients?search=${query}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to fetch patient data.');
        }

        const data = await res.json();
        setResults(data);
      } catch (err) {
        setError(err.message);
        setResults([]); // Clear results on error
      } finally {
        setLoading(false);
      }
    }, 500),
    [] // Empty dependency array means this callback is created only once
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Patient Search</h2>
      <div className="max-w-xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>

        <div className="mt-6">
          {loading && <p className="text-gray-500">Searching...</p>}
          {error && <p className="text-red-600 font-semibold">Error: {error}</p>}

          {!loading && !error && hasSearched && results.length === 0 && (
            <p className="mt-4 text-gray-500">No patients found for "{searchTerm}".</p>
          )}

          {!loading && !error && results.length > 0 && (
            <div className="space-y-4">
              {results.map(patient => (
                <div key={patient._id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                  <p className="font-bold text-lg text-gray-800">{patient.name}</p>
                  <p className="text-sm text-gray-600">{patient.email}</p>
                  <p className="text-xs text-gray-400 mt-1">ID: {patient._id}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Utility debounce function
function debounce(func, delay) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

export default PatientSearch;

