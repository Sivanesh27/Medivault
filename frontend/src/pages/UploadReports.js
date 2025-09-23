import React, { useState, useEffect } from 'react';

function UploadReports() {
  // State for the upload form
  const [recordType, setRecordType] = useState('');
  const [details, setDetails] = useState('');
  const [file, setFile] = useState(null);
  
  // State for patient search
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // State for feedback
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Debounced search effect
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(() => {
      const token = localStorage.getItem('adminToken');
      fetch(`http://localhost:5000/api/admin/patients?search=${searchQuery}`, {
          headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => setSearchResults(data))
      .catch(() => setSearchResults([]));
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !selectedPatient || !recordType) {
      setMessage('Please select a patient, a report type, and a file.');
      return;
    }

    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('patientId', selectedPatient._id);
    formData.append('recordType', recordType);
    formData.append('details', details);
    formData.append('reportFile', file);

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('http://localhost:5000/api/records', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Upload failed.');
      }

      setMessage(`Report successfully uploaded for ${selectedPatient.name}.`);
      // Reset form
      setSelectedPatient(null);
      setRecordType('');
      setDetails('');
      setFile(null);
      document.getElementById('file-input').value = null; // Clear file input

    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Upload Patient Report</h2>

      {/* Step 1: Patient Search */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <label htmlFor="patientSearch" className="block text-lg font-semibold text-gray-700 mb-2">
          1. Find Patient
        </label>
        <input
          id="patientSearch"
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-3 rounded-lg w-full"
        />
        {searchResults.length > 0 && (
          <ul className="mt-2 border rounded-lg bg-gray-50 max-h-40 overflow-y-auto">
            {searchResults.map(p => (
              <li 
                key={p._id} 
                className="p-3 hover:bg-blue-100 cursor-pointer"
                onClick={() => handleSelectPatient(p)}
              >
                {p.name} ({p.email})
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Step 2: Upload Form */}
      <form onSubmit={handleUpload} className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          2. Upload Details {selectedPatient ? `for ${selectedPatient.name}` : '(Select a patient first)'}
        </h3>
        <fieldset disabled={!selectedPatient || loading} className="space-y-4">
          <select 
            value={recordType} 
            onChange={(e) => setRecordType(e.target.value)}
            className="border p-3 rounded-lg w-full disabled:bg-gray-200"
            required
          >
            <option value="">Select Report Type...</option>
            <option>Prescription</option>
            <option>Lab Result</option>
            <option>Medical Image (X-Ray, MRI)</option>
            <option>Surgery Details</option>
            <option>Bill</option>
          </select>
          
          <textarea
            placeholder="Add brief details or notes..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="border p-3 rounded-lg w-full h-24 disabled:bg-gray-200"
          />

          <input 
            id="file-input"
            type="file" 
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
            required
          />

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-bold p-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? 'Uploading...' : 'Upload Report'}
          </button>
        </fieldset>
      </form>

      {message && (
        <p className={`text-center mt-4 font-medium ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default UploadReports;
