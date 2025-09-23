import React, { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("Registering...");

    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      setMessage("All fields are required.");
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        // If the server responds with an error (e.g., user exists)
        throw new Error(data.message || 'Failed to register.');
      }

      // On success
      setMessage("Registration successful! Please proceed to login.");
      // Optionally, clear the form
      setFormData({ name: '', email: '', password: '' });

    } catch (error) {
      // Handle network errors or errors from the backend
      setMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
          Create Account
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Register to get started with MediVault
        </p>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl shadow-md hover:bg-blue-700 transition transform hover:-translate-y-1 font-semibold"
          >
            Register
          </button>
        </form>

        {/* Message */}
        {message && (
          <p
            className={`text-center mt-4 font-medium ${
              message.includes("successful") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
