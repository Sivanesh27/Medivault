import React, { useState } from "react";

const sample = [
  { name: "Diabetes Mellitus", summary: "A chronic condition that affects blood sugar regulation.", prevention: "Healthy diet, exercise, regular screening" },
  { name: "Hypertension", summary: "High blood pressure, risk for heart disease and stroke.", prevention: "Limit salt, exercise, medication adherence" },
];

export default function DiseaseEncyclopedia() {
  const [query, setQuery] = useState("");
  const results = sample.filter(d => d.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h1>Disease Encyclopedia</h1>
      <input placeholder="Search disease..." value={query} onChange={(e) => setQuery(e.target.value)} style={{ padding: 8, width: "100%", marginBottom: 12 }} />

      {results.length === 0 && <p>No results. Expand dataset or integrate with server-side disease DB.</p>}

      {results.map((d, i) => (
        <div key={i} style={{ border: "1px solid #eee", padding: 12, marginBottom: 12 }}>
          <h3>{d.name}</h3>
          <p><b>Summary:</b> {d.summary}</p>
          <p><b>Prevention:</b> {d.prevention}</p>
        </div>
      ))}
    </div>
  );
}
