import React, { useState } from "react";

export default function DiseasePredictor() {
  const [form, setForm] = useState({ age: "", gender: "male", feature1: "", feature2: "" });
  const [prediction, setPrediction] = useState(null);

  const handlePredict = (e) => {
    e.preventDefault();
    setPrediction({ status: "loading" });

    // TODO: send features to predictive model endpoint
    setTimeout(() => {
      setPrediction({ status: "done", result: "Low risk", details: "Model confidence: 82%" });
    }, 1000);
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h1>Disease Predictor</h1>
      <p>Enter simple clinical features to get a predictive risk (mock demo).</p>

      <form onSubmit={handlePredict}>
        <input placeholder="Age" value={form.age} onChange={(e) => setForm({...form, age: e.target.value})} /><br />
        <select value={form.gender} onChange={(e) => setForm({...form, gender: e.target.value})}>
          <option value="male">Male</option><option value="female">Female</option>
        </select><br />
        <input placeholder="Feature 1 (e.g., blood sugar)" value={form.feature1} onChange={(e) => setForm({...form, feature1: e.target.value})} /><br />
        <input placeholder="Feature 2 (e.g., blood pressure)" value={form.feature2} onChange={(e) => setForm({...form, feature2: e.target.value})} /><br />
        <button type="submit">Predict</button>
      </form>

      {prediction?.status === "loading" && <p>Predicting...</p>}
      {prediction?.status === "done" && (
        <div>
          <h3>Result: {prediction.result}</h3>
          <p>{prediction.details}</p>
        </div>
      )}
    </div>
  );
}
