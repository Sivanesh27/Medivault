import React, { useState } from 'react';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('Authenticating...');

    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Invalid credentials.');
      }

      // Crucial Step: Decode the token to verify the user's role.
      try {
        const payload = JSON.parse(atob(data.token.split('.')[1]));
        
        // Check if the role is 'admin'. This is the fix.
        if (payload.role !== 'admin') {
          throw new Error('Access Forbidden: You do not have admin privileges.');
        }

        // If the role is correct, proceed.
        setMessage('Admin login successful! Redirecting...');
        localStorage.setItem('adminToken', data.token); // Store token separately
        
        setTimeout(() => {
          window.location.href = '/admin-dashboard';
        }, 1500);

      } catch (e) {
        // This will catch both decoding errors and the "Forbidden" error thrown above.
        throw new Error(e.message || 'Invalid token received from server.');
      }
      
    } catch (error) {
      setMessage(error.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-900 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Admin Portal
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Please login to continue.
        </p>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email Address</label>
            <input
              id="email" type="email" placeholder="admin@example.com" value={email}
              onChange={(e) => setEmail(e.target.value)} required disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              id="password" type="password" placeholder="••••••••" value={password}
              onChange={(e) => setPassword(e.target.value)} required disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-xl shadow-md hover:bg-red-700 font-semibold transition disabled:bg-red-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
        {message && (
          <p className={`text-center mt-4 font-medium ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminLogin;

