import React, { useState } from "react";

function UploadReports() {
  const [type, setType] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    alert(`Uploaded ${file?.name} as ${type}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-brandBlue mb-4">Upload Reports</h2>
      <select 
        value={type} onChange={(e) => setType(e.target.value)}
        className="border p-2 rounded mb-4 block w-64"
      >
        <option value="">Select Report Type</option>
        <option>Prescription</option>
        <option>Bill</option>
        <option>Medical Image</option>
        <option>Implant Details</option>
        <option>Surgery Details</option>
      </select>
      <input 
        type="file" onChange={(e) => setFile(e.target.files[0])}
        className="mb-4 block"
      />
      <button onClick={handleUpload} className="bg-brandBlue text-white px-4 py-2 rounded hover:bg-blue-700">
        Upload
      </button>
    </div>
  );
}

export default UploadReports;
