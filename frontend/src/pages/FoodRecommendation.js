import React, { useState } from "react";

function FoodRecommendation() {
  const [goal, setGoal] = useState("general");
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getRecommendations = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRecommendations(null);
    setError('');

    const token = localStorage.getItem('userToken');

    try {
      const res = await fetch('http://localhost:5000/api/analysis/food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ goal }),
      });

      if (!res.ok) {
        throw new Error('Could not fetch recommendations at this time.');
      }

      const data = await res.json();
      setRecommendations(data.recommendations);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-white py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-extrabold text-lime-700 text-center mb-4">Personalized Nutrition Guide</h1>
        <p className="text-center text-gray-600 mb-8">
          Select a health goal to receive tailored food recommendations.
        </p>

        <form onSubmit={getRecommendations} className="flex flex-col sm:flex-row items-center gap-4 bg-lime-50 p-4 rounded-xl border border-lime-200">
          <label htmlFor="goal" className="font-semibold text-gray-700">My health goal is:</label>
          <select
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="flex-grow w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400"
          >
            <option value="general">General Health</option>
            <option value="diabetic">Diabetes Management</option>
            <option value="cardio">Cardiovascular Health</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-lime-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-lime-700 font-semibold disabled:bg-lime-300"
          >
            {loading ? 'Getting...' : 'Get Advice'}
          </button>
        </form>

        <div className="mt-8">
            {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>}
        </div>

        {recommendations && (
          <div className="mt-8 p-6 bg-lime-50 border border-lime-200 rounded-xl">
            <h3 className="text-2xl font-bold text-lime-800 mb-4">Recommended Foods</h3>
            <ul className="list-disc list-inside space-y-3 text-gray-800">
              {recommendations.map((rec, i) => (
                <li key={i} className="pl-2">{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default FoodRecommendation;
