import React, { useState } from "react";

function SymptomAnalyzer() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyzeSymptoms = async (e) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      setError("Please enter your symptoms before analyzing.");
      return;
    }
    setLoading(true);
    setResult(null);
    setError('');

    const token = localStorage.getItem('userToken');

    try {
      const res = await fetch('http://localhost:5000/api/analysis/symptoms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ symptoms }),
      });

      if (!res.ok) {
        throw new Error('Failed to get analysis. Please try again.');
      }
      
      const data = await res.json();
      setResult(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-extrabold text-orange-700 text-center mb-4">Symptom Analyzer</h1>
        <p className="text-center text-gray-600 mb-8">
          Enter your symptoms below to get a list of possible conditions. This is not a substitute for professional medical advice.
        </p>

        <form onSubmit={analyzeSymptoms} className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="e.g., fever, headache, sore throat"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="flex-grow w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto flex items-center justify-center bg-orange-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-orange-700 transition font-semibold disabled:bg-orange-300"
          >
            {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : "Analyze"}
          </button>
        </form>

        <div className="mt-8">
            {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>}
        </div>

        {result && (
          <div className="mt-8 p-6 bg-orange-50 border border-orange-200 rounded-xl">
            <h3 className="text-2xl font-bold text-orange-800 mb-4">Analysis Results</h3>
            <div className="space-y-3">
              <p className="font-semibold text-gray-700">Possible Conditions:</p>
              <ul className="list-disc list-inside space-y-2">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="text-gray-800">
                    <span className="font-bold">{s.condition}</span> — Likelihood: <span className="font-semibold text-orange-700">{s.probability}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 border-t border-orange-200 pt-4">
               <p className="font-semibold text-gray-700">Advice:</p>
               <p className="text-sm text-gray-600 mt-1">{result.advice}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SymptomAnalyzer;
