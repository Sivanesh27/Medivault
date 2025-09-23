import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // To provide user feedback

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('Logging in...'); // Provide instant feedback

    try {
      // API call to your backend's login route
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // If login is successful (status code 200-299)
        setMessage('Login successful! Redirecting...');
        
        // Store the token for future authenticated requests
        localStorage.setItem('userToken', data.token);

        // Redirect to the dashboard after a short delay
        setTimeout(() => {
          // Use window.location.href for redirection to avoid context errors in isolation
          window.location.href = '/dashboard';
        }, 1000);

      } else {
        // If login fails, display the error message from the backend
        setMessage(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      // Handle network errors or if the server is down
      console.error('Login error:', error);
      setMessage('Server error. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Login to access your MediVault account
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl shadow-md hover:bg-blue-700 transition transform hover:-translate-y-1 font-semibold"
          >
            Login
          </button>
        </form>

        {/* Feedback Message */}
        {message && (
          <p className={`text-center mt-4 font-medium ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline font-medium">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
