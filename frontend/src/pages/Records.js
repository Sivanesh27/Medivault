import React from 'react';

function Records() {
  const mockRecords = [
    { date: "2025-01-10", type: "X-Ray", details: "Fracture check" },
    { date: "2025-03-02", type: "Prescription", details: "Antibiotics for infection" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-purple-700 text-center mb-6">
          Medical Records
        </h1>
        <p className="text-center text-gray-600 mb-10">
          A quick overview of your recent medical history.
        </p>

        {/* Records List */}
        <ul className="space-y-6">
          {mockRecords.map((record, index) => (
            <li
              key={index}
              className="p-5 border rounded-xl shadow-sm hover:shadow-md transition bg-purple-50"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-bold text-purple-800">
                  {record.type}
                </span>
                <span className="text-sm text-gray-500">{record.date}</span>
              </div>
              <p className="text-gray-700">{record.details}</p>
            </li>
          ))}
        </ul>

        {/* Footer Note */}
        <p className="mt-10 text-center text-sm text-gray-500">
          For more details, visit your healthcare provider’s portal.
        </p>
      </div>
    </div>
  );
}

export default Records;
