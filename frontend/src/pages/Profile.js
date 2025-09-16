import React from 'react';

function Profile() {
  const mockProfile = {
    name: "John Doe",
    age: 30,
    email: "johndoe@email.com",
    id: "MED123456789",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600 shadow">
            {mockProfile.name.charAt(0)}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-blue-700 mb-2">
          {mockProfile.name}
        </h1>
        <p className="text-gray-500 text-sm mb-6">Patient ID: {mockProfile.id}</p>

        {/* Profile Info */}
        <div className="space-y-4 text-left">
          <p className="flex justify-between text-gray-700">
            <span className="font-semibold">Age:</span>
            <span>{mockProfile.age}</span>
          </p>
          <p className="flex justify-between text-gray-700">
            <span className="font-semibold">Email:</span>
            <span className="truncate">{mockProfile.email}</span>
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
