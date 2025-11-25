import React, { useState, useEffect } from 'react';

function Records() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecords = async () => {
      const token = localStorage.getItem('userToken');
      if (!token) {
        setError('Not authorized. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/records', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch medical records.');
        }

        const data = await res.json();
        setRecords(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  if (loading) {
    return <div className="p-10 text-center"><p>Loading records...</p></div>;
  }

  if (error) {
    return <div className="p-10 text-center"><p className="text-red-500">Error: {error}</p></div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-purple-700 text-center mb-6">
          Medical Records
        </h1>
        <p className="text-center text-gray-600 mb-10">
          A secure overview of your medical history.
        </p>

        {/* Records List */}
        {records.length > 0 ? (
          <ul className="space-y-6">
            {records.map((record) => (
              <li
                key={record._id}
                className="p-5 border rounded-xl shadow-sm hover:shadow-md transition bg-purple-50"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-bold text-purple-800">
                    {record.type}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(record.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{record.details}</p>
                 {record.documentUrl && (
                    <a 
                      href={`http://localhost:5000${record.documentUrl}`}  
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                    >
                      View Document
                    </a>
                  )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No medical records found.</p>
        )}

        {/* Footer Note */}
        <p className="mt-10 text-center text-sm text-gray-500">
          For more details, please consult with your healthcare provider.
        </p>
      </div>
    </div>
  );
}

export default Records;
