import React, { useState } from "react";

export default function SymptomAnalyzer() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);

  const analyze = async (e) => {
    e.preventDefault();
    if (!symptoms.trim()) return;
    setResult({ status: "loading" });

    // TODO: Replace with backend/ML API call that returns likely causes.
    setTimeout(() => {
      setResult({
        status: "success",
        suggestions: [
          { condition: "Common Cold", probability: "45%" },
          { condition: "Allergic Rhinitis", probability: "25%" },
        ],
        advice: "See a doctor if high fever, shortness of breath, or symptoms worsen."
      });
    }, 1000);
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h1>Symptom Analyzer</h1>
      <p>Type your symptoms (e.g., fever, sore throat, cough) and get possible causes.</p>

      <form onSubmit={analyze} style={{ display: "flex", gap: 8 }}>
        <input
          placeholder="e.g. fever, headache, sore throat"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
        />
        <button style={{ padding: "8px 12px" }}>Analyze</button>
      </form>

      <div style={{ marginTop: 16 }}>
        {result?.status === "loading" && <p>Analyzing...</p>}
        {result?.status === "success" && (
          <div>
            <h3>Possible conditions</h3>
            <ul>
              {result.suggestions.map((s, i) => <li key={i}><b>{s.condition}</b> — {s.probability}</li>)}
            </ul>
            <p><b>Advice:</b> {result.advice}</p>
          </div>
        )}
      </div>
    </div>
  );
}
