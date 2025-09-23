import React, { useState } from "react";

function DiseasePredictor() {
  const [form, setForm] = useState({
    age: "",
    gender: "male",
    bloodSugar: "",
    bloodPressure: "",
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    if (!form.age || !form.bloodSugar || !form.bloodPressure) {
        setError("Please fill in all fields.");
        return;
    }
    setLoading(true);
    setPrediction(null);
    setError('');
    
    const token = localStorage.getItem('userToken');

    try {
        const res = await fetch('http://localhost:5000/api/analysis/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(form),
        });

        if (!res.ok) {
            throw new Error('Prediction service is currently unavailable.');
        }

        const data = await res.json();
        setPrediction(data);

    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  const getRiskColor = (risk) => {
      if (!risk) return 'text-gray-700 bg-gray-100';
      const riskLevel = risk.toLowerCase();
      if (riskLevel.includes('high')) return 'text-red-700 bg-red-100';
      if (riskLevel.includes('medium')) return 'text-yellow-700 bg-yellow-100';
      return 'text-green-700 bg-green-100';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-extrabold text-yellow-700 text-center mb-4">AI Disease Predictor</h1>
        <p className="text-center text-gray-600 mb-8">
          Enter clinical features to get a predictive risk assessment. This is a demonstration and not a medical diagnosis.
        </p>

        <form onSubmit={handlePredict} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <label htmlFor="age" className="block text-gray-700 font-semibold mb-2">Age</label>
            <input type="number" name="age" id="age" placeholder="e.g., 45" value={form.age} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" required />
          </div>
          <div className="col-span-1">
            <label htmlFor="gender" className="block text-gray-700 font-semibold mb-2">Gender</label>
            <select name="gender" id="gender" value={form.gender} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="col-span-1">
            <label htmlFor="bloodSugar" className="block text-gray-700 font-semibold mb-2">Blood Sugar (mg/dL)</label>
            <input type="number" name="bloodSugar" id="bloodSugar" placeholder="e.g., 120" value={form.bloodSugar} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" required />
          </div>
          <div className="col-span-1">
            <label htmlFor="bloodPressure" className="block text-gray-700 font-semibold mb-2">Systolic BP (mmHg)</label>
            <input type="number" name="bloodPressure" id="bloodPressure" placeholder="e.g., 140" value={form.bloodPressure} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl" required />
          </div>

          <div className="md:col-span-2 text-center mt-4">
            <button type="submit" disabled={loading} className="w-full md:w-auto bg-yellow-600 text-white px-8 py-3 rounded-xl shadow-md hover:bg-yellow-700 font-semibold disabled:bg-yellow-300">
              {loading ? 'Analyzing...' : 'Predict Risk'}
            </button>
          </div>
        </form>

         <div className="mt-8">
            {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>}
        </div>

        {prediction && (
            <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl text-center">
                <h3 className="text-2xl font-bold text-yellow-800 mb-4">Prediction Result</h3>
                <div className={`inline-block px-6 py-2 rounded-full font-bold text-lg ${getRiskColor(prediction.result)}`}>
                    {prediction.result}
                </div>
                <p className="text-gray-600 mt-3">{prediction.details}</p>
            </div>
        )}
      </div>
    </div>
  );
}

export default DiseasePredictor;
