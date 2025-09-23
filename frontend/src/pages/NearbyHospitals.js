import React, { useEffect, useState } from "react";

function NearbyHospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // This function sends the user's coordinates to our backend API
    const fetchHospitals = (latitude, longitude) => {
      const token = localStorage.getItem('userToken');
      fetch('http://localhost:5000/api/location/hospitals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ latitude, longitude })
      })
      .then(res => {
          if (!res.ok) {
            // If the server response is not OK, we'll get a more specific error
            return res.json().then(errData => {
              throw new Error(errData.message || 'Could not fetch hospital data.');
            });
          }
          return res.json();
      })
      .then(data => {
          setHospitals(data);
      })
      .catch(err => {
          setError(err.message);
      })
      .finally(() => {
          setLoading(false); // Stop the loading indicator
      });
    };

    // 1. Check if the user's browser supports the Geolocation API
    if (navigator.geolocation) {
      // 2. Request the user's current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // 3. On success, call our API with the coordinates
          const { latitude, longitude } = position.coords;
          fetchHospitals(latitude, longitude);
        },
        (err) => {
          // 4. Handle errors, like the user denying permission
          setError('Geolocation permission denied. Please enable it in your browser settings to find nearby hospitals.');
          setLoading(false);
        }
      );
    } else {
      // Handle the case where the browser doesn't support geolocation at all
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []); // The empty dependency array ensures this effect runs only once

  // Function to open Google Maps with the hospital's details
  const openInMaps = (hospital) => {
      const query = encodeURIComponent(`${hospital.name}, ${hospital.address}`);
      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-10 px-4">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-4">Nearby Hospitals & Clinics</h1>
            <p className="text-center text-gray-600 mb-10">
                {loading ? 'Requesting your location to find nearby hospitals...' : 'Showing real-time results for your area.'}
            </p>

            {/* Display a prominent error message if anything went wrong */}
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg text-center" role="alert">
                    <p className="font-bold">An Error Occurred</p>
                    <p>{error}</p>
                </div>
            )}
            
            {/* Display the list of hospitals only if loading is done and there are no errors */}
            {!loading && !error && (
                <div className="space-y-6">
                    {hospitals.map((hospital, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 transition-shadow duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h3 className="text-xl font-bold text-blue-700">{hospital.name}</h3>
                                <p className="text-gray-600 mt-1">{hospital.address}</p>
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0 mt-4 sm:mt-0">
                                <button onClick={() => openInMaps(hospital)} className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                    View on Map
                                </button>
                            </div>
                        </div>
                    ))}
                    {/* Show a message if the search returns no results */}
                    {hospitals.length === 0 && <p className="text-center text-gray-500 py-10">No hospitals were found in your immediate area.</p>}
                </div>
            )}
        </div>
    </div>
  );
}

export default NearbyHospitals;

