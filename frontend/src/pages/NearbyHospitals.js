import React, { useEffect, useState } from "react";

export default function NearbyHospitals() {
  const [hospitals, setHospitals] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with real-world API (Google Places / OpenStreetMap) and user's geolocation
    setTimeout(() => {
      setHospitals([
        { name: "City General Hospital", address: "123 Main St", distance: "2.1 km", phone: "044-123456" },
        { name: "Care Plus Clinic", address: "45 Health Ave", distance: "3.4 km", phone: "044-987654" }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const handleCall = (phone) => window.open(`tel:${phone}`);

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h1>Nearby Hospitals</h1>
      <p>Allow location and integrate with a places API to get live results.</p>

      {loading ? <p>Searching nearby hospitals...</p> :
        hospitals.map((h, i) => (
          <div key={i} style={{ border: "1px solid #eee", padding: 12, marginBottom: 10, borderRadius: 6 }}>
            <h3>{h.name}</h3>
            <p>{h.address} — {h.distance}</p>
            <button onClick={() => handleCall(h.phone)} style={{ marginRight: 8 }}>Call</button>
            <button onClick={() => alert("Open maps (implement)")}>Open in Maps</button>
          </div>
        ))
      }
    </div>
  );
}
