import React, { useEffect, useState } from "react";

function MedicineReminders() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReminders = async () => {
      const token = localStorage.getItem('userToken');
      if (!token) {
        setError("Please log in to see your reminders.");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch('http://localhost:5000/api/reminders', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch reminders.');
        const data = await res.json();
        setReminders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReminders();
  }, []);

  const handleToggle = async (id) => {
    const token = localStorage.getItem('userToken');
    try {
        const res = await fetch(`http://localhost:5000/api/reminders/${id}/toggle`, {
            method: 'PATCH',
            headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to update reminder.');
        const updatedReminder = await res.json();
        setReminders(reminders.map(r => r._id === id ? updatedReminder : r));
    } catch (err) {
        setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
            <h1 className="text-4xl font-extrabold text-red-700 text-center mb-4">Medicine Reminders</h1>
            <p className="text-center text-gray-600 mb-10">
                Stay on track with your medication schedule.
            </p>

            {loading && <p className="text-center">Loading reminders...</p>}
            {error && <p className="text-center text-red-500">Error: {error}</p>}

            {!loading && reminders.length > 0 && (
                <ul className="space-y-4">
                    {reminders.map(r => (
                        <li key={r._id} className="flex items-center justify-between bg-red-50 p-4 rounded-xl shadow-sm border border-red-100">
                            <div>
                                <p className="font-bold text-red-800">{r.medicine}</p>
                                <p className="text-sm text-gray-600">{r.dosage} at {r.time}</p>
                            </div>
                            <button
                                onClick={() => handleToggle(r._id)}
                                className={`px-4 py-2 rounded-full font-semibold text-sm transition ${
                                    r.active
                                    ? "bg-green-600 text-white hover:bg-green-700"
                                    : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                                }`}
                            >
                                {r.active ? "Active" : "Disabled"}
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {!loading && reminders.length === 0 && !error && (
                <p className="text-center text-gray-500 mt-6">You have no reminders set up.</p>
            )}

            <p className="mt-10 text-center text-sm text-gray-500">
                <i>Note: New reminders are added by your healthcare provider or pharmacy.</i>
            </p>
        </div>
    </div>
  );
}

export default MedicineReminders;
