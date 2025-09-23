import React, { useState, useEffect } from 'react';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('userToken');
      if (!token) {
        setError('Not authorized. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch profile data.');
        }

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading profile...</p></div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-red-500">Error: {error}</p></div>;
  }

  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center"><p>No profile data found.</p></div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-4xl font-bold text-blue-600 shadow-inner">
            {profile.name.charAt(0)}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-blue-700 mb-2">
          {profile.name}
        </h1>
        <p className="text-gray-500 text-sm mb-6">Patient ID: {profile._id}</p>

        {/* Profile Info */}
        <div className="space-y-4 text-left border-t pt-6">
          <p className="flex justify-between items-center text-gray-700">
            <span className="font-semibold">Email:</span>
            <span className="truncate bg-gray-100 px-2 py-1 rounded">{profile.email}</span>
          </p>
          {/* Add other profile details here as needed */}
          <p className="flex justify-between items-center text-gray-700">
             <span className="font-semibold">Role:</span>
             <span className="capitalize bg-gray-100 px-2 py-1 rounded">{profile.role}</span>
          </p>
        </div>

        {/* Action Button */}
        <button className="mt-8 w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
