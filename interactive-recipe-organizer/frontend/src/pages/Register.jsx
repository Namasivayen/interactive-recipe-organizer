import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (!username || !email || !password) {
      setError('All fields are required');
      return;
    }
    try {
      await api.post('/auth/register', { username, email, password });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl p-10 w-full max-w-md border border-gray-700">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text mb-2">Create Account</h2>
          <p className="text-gray-400">Join our community of food lovers</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-500/20 border border-green-500 text-green-200 px-4 py-3 rounded-lg text-sm">
              Registration successful! Redirecting...
            </div>
          )}
          
          <div>
            <label className="block text-gray-300 mb-2 text-sm font-semibold">👤 Username</label>
            <input 
              type="text" 
              placeholder="Choose a username" 
              value={username} 
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2 text-sm font-semibold">📧 Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2 text-sm font-semibold">🔒 Password</label>
            <input 
              type="password" 
              placeholder="Create a password" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:shadow-green-500/50 transform hover:scale-[1.02] transition-all duration-300"
          >
            Register
          </button>
        </form>
        
        <div className="mt-6 text-center text-gray-400 text-sm">
          Already have an account? <Link to="/login" className="text-green-500 hover:text-green-400 font-semibold">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
