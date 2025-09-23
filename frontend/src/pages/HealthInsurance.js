import React, { useState } from 'react';

function HealthInsurance() {
  const [formData, setFormData] = useState({
    policyNumber: '',
    claimType: 'Hospitalization',
    claimAmount: '',
    description: '',
  });
  const [message, setMessage] = useState('');

  const { policyNumber, claimType, claimAmount, description } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setMessage('Submitting claim...');
    try {
      const res = await fetch('http://localhost:5000/api/insurance/claims', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage('Claim submitted successfully! You will be notified of the status.');
        setFormData({ policyNumber: '', claimType: 'Hospitalization', claimAmount: '', description: '' });
      } else {
        const data = await res.json();
        setMessage(data.message || 'Error submitting claim.');
      }
    } catch (error) {
      setMessage('Server error. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-center text-cyan-700 mb-6">
          Health Insurance Claim
        </h1>
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Policy Number */}
          <div>
            <label htmlFor="policyNumber" className="block text-gray-700 font-semibold mb-2">Policy Number</label>
            <input id="policyNumber" type="text" name="policyNumber" value={policyNumber} onChange={onChange} placeholder="e.g., POL12345678" className="w-full px-4 py-3 border border-gray-300 rounded-xl" required />
          </div>
          {/* Claim Type */}
          <div>
            <label htmlFor="claimType" className="block text-gray-700 font-semibold mb-2">Claim Type</label>
            <select id="claimType" name="claimType" value={claimType} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl">
              <option>Hospitalization</option>
              <option>Accident</option>
              <option>Critical Illness</option>
              <option>Other</option>
            </select>
          </div>
          {/* Claim Amount */}
          <div>
            <label htmlFor="claimAmount" className="block text-gray-700 font-semibold mb-2">Claim Amount ($)</label>
            <input id="claimAmount" type="number" name="claimAmount" value={claimAmount} onChange={onChange} placeholder="e.g., 1500" className="w-full px-4 py-3 border border-gray-300 rounded-xl" required />
          </div>
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Brief Description</label>
            <textarea id="description" name="description" value={description} onChange={onChange} rows="3" placeholder="Describe the reason for the claim..." className="w-full px-4 py-3 border border-gray-300 rounded-xl" required />
          </div>
          <button type="submit" className="w-full bg-cyan-600 text-white py-3 rounded-xl shadow-md hover:bg-cyan-700 font-semibold">
            Submit Claim
          </button>
        </form>
        {message && <p className="text-center mt-4 font-medium">{message}</p>}
      </div>
    </div>
  );
}

export default HealthInsurance;