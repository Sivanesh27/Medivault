import React, { useState } from "react";

export default function ReportAnalyzer() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const uploadAndAnalyze = (e) => {
    e.preventDefault();
    if (!file) return;
    setAnalysis({ status: "loading" });

    // TODO: upload file to backend and call report analysis ML service
    setTimeout(() => {
      setAnalysis({
        status: "done",
        summary: "Report indicates normal ranges for CBC. Slight elevation in CRP.",
        recommendations: ["Consult physician for inflammation cause", "Follow-up in 2 weeks"]
      });
    }, 1200);
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h1>Report Analyzer</h1>
      <p>Upload medical reports (PDF/image) to get an automated summary/insights.</p>

      <form onSubmit={uploadAndAnalyze}>
        <input type="file" accept=".pdf,image/*" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit" style={{ marginLeft: 8 }}>Analyze</button>
      </form>

      <div style={{ marginTop: 16 }}>
        {analysis?.status === "loading" && <p>Analyzing report...</p>}
        {analysis?.status === "done" && (
          <div>
            <h3>Summary</h3>
            <p>{analysis.summary}</p>
            <h4>Recommendations</h4>
            <ul>{analysis.recommendations.map((r, i) => <li key={i}>{r}</li>)}</ul>
          </div>
        )}
      </div>
    </div>
  );
}
