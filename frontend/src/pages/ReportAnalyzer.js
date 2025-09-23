import React, { useState } from "react";

function ReportAnalyzer() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(''); // Clear previous errors on new file selection
      setAnalysis(null); // Clear previous analysis
    }
  };

  const uploadAndAnalyze = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a report file to analyze.");
      return;
    }
    setLoading(true);
    setAnalysis(null);
    setError('');

    const token = localStorage.getItem('userToken');
    const formData = new FormData();
    formData.append('reportFile', file); // 'reportFile' must match the name in multer middleware

    try {
      const res = await fetch('http://localhost:5000/api/analysis/report', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data' is set automatically by the browser with FormData
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error('File analysis failed. The file may be an unsupported format or too large.');
      }
      
      const data = await res.json();
      setAnalysis(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-extrabold text-teal-700 text-center mb-4">Report Analyzer</h1>
        <p className="text-center text-gray-600 mb-8">
          Upload a medical report (PDF, JPG, PNG) to receive an automated summary and insights from our AI.
        </p>

        <form onSubmit={uploadAndAnalyze} className="space-y-6">
          <div>
            <label htmlFor="file-upload" className="block text-gray-700 font-semibold mb-2">Upload Report</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".pdf,.png,.jpg,.jpeg" onChange={handleFileChange} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
              </div>
            </div>
            {file && <p className="text-sm text-center text-gray-600 mt-2">Selected: <span className="font-medium">{file.name}</span></p>}
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading || !file}
              className="w-full md:w-auto bg-teal-600 text-white px-8 py-3 rounded-xl shadow-md hover:bg-teal-700 font-semibold disabled:bg-teal-300 disabled:cursor-not-allowed"
            >
              {loading ? 'Analyzing...' : 'Analyze Report'}
            </button>
          </div>
        </form>

        <div className="mt-8">
            {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>}
        </div>

        {analysis && (
          <div className="mt-8 p-6 bg-teal-50 border border-teal-200 rounded-xl">
            <h3 className="text-2xl font-bold text-teal-800 mb-4">Analysis Results</h3>
            <div>
              <p className="font-semibold text-gray-700">Summary:</p>
              <p className="text-gray-800 mt-1">{analysis.summary}</p>
            </div>
            <div className="mt-4 border-t border-teal-200 pt-4">
              <p className="font-semibold text-gray-700">Recommendations:</p>
              <ul className="list-disc list-inside space-y-1 mt-1 text-gray-800">
                {analysis.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportAnalyzer;
