import React, { useState } from "react";

function PatientSearch() {
  const [patientId, setPatientId] = useState("");

  const handleSearch = () => {
    alert(`Fetching data for Patient ID: ${patientId}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-brandBlue mb-4">Patient Search</h2>
      <div className="flex space-x-4">
        <input 
          type="text" placeholder="Enter Patient ID" value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <button onClick={handleSearch} className="bg-brandBlue text-white px-4 py-2 rounded hover:bg-blue-700">
          Search
        </button>
      </div>
    </div>
  );
}

export default PatientSearch;
