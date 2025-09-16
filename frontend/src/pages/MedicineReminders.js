import React, { useEffect, useState } from "react";

export default function MedicineReminders() {
  const [reminders, setReminders] = useState([
    // sample local mock data — replace with backend fetch
    { id: 1, medicine: "Paracetamol", dosage: "500mg", time: "09:00 AM", active: true },
    { id: 2, medicine: "Vitamin D", dosage: "1000 IU", time: "08:00 PM", active: true },
  ]);

  useEffect(() => {
    // TODO: fetch reminders for logged-in user from backend
  }, []);

  const toggle = (id) => {
    setReminders((r) => r.map(item => item.id === id ? { ...item, active: !item.active } : item));
    // TODO: persist toggle to backend
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h1>Medicine Reminders</h1>
      <p>View upcoming medicine reminders. Only admin/pharmacy can create reminders in your setup.</p>

      <ul>
        {reminders.map(r => (
          <li key={r.id} style={{ marginBottom: 8 }}>
            <b>{r.medicine}</b> — {r.dosage} at {r.time} {" "}
            <button onClick={() => toggle(r.id)} style={{ marginLeft: 8 }}>
              {r.active ? "Disable" : "Enable"}
            </button>
          </li>
        ))}
      </ul>

      <p style={{ color: "#666" }}><i>Note: Creation/editing handled by admin. This UI allows user to enable/disable local notifications (requires integration).</i></p>
    </div>
  );
}
