import React, { useState } from "react";

export default function FoodRecommendation() {
  const [goal, setGoal] = useState("general");
  const [rec, setRec] = useState(null);

  const getRec = (e) => {
    e.preventDefault();
    // TODO: call backend nutrition engine / DB
    const mock = {
      general: ["Fruits", "Vegetables", "Whole grains"],
      diabetic: ["Low glycemic index foods", "Leafy greens", "Lean protein"],
      cardio: ["Omega-3 rich fish", "Nuts", "Oats"]
    };
    setRec(mock[goal] || mock.general);
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h1>Food Recommendation</h1>
      <p>Get quick diet suggestions based on health goal.</p>

      <form onSubmit={getRec}>
        <select value={goal} onChange={(e) => setGoal(e.target.value)} style={{ padding: 8 }}>
          <option value="general">General Health</option>
          <option value="diabetic">Diabetic</option>
          <option value="cardio">Cardiovascular</option>
        </select>
        <button type="submit" style={{ marginLeft: 8 }}>Get Recommendations</button>
      </form>

      {rec && (
        <div style={{ marginTop: 12 }}>
          <h3>Recommended Foods</h3>
          <ul>{rec.map((r, i) => <li key={i}>{r}</li>)}</ul>
        </div>
      )}
    </div>
  );
}
