import React from "react";

function Sessions() {
  const sessions = [
    { date: "2025-09-20", patient: "John Doe", topic: "Follow-up" },
    { date: "2025-09-22", patient: "Jane Smith", topic: "Surgery Discussion" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-brandBlue mb-4">Scheduled Sessions</h2>
      <ul>
        {sessions.map((s, i) => (
          <li key={i} className="bg-white rounded-xl shadow p-4 mb-4">
            <strong>{s.date}</strong> - {s.patient} ({s.topic})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sessions;
