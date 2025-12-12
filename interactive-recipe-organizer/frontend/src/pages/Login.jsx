import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('All fields are required');
      return;
    }
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl p-10 w-full max-w-md border border-gray-700">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text mb-2">Welcome Back</h2>
          <p className="text-gray-400">Login to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-gray-300 mb-2 text-sm font-semibold">📧 Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2 text-sm font-semibold">🔒 Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-lg shadow-lg hover:shadow-orange-500/50 transform hover:scale-[1.02] transition-all duration-300"
          >
            Login
          </button>
        </form>
        
        <div className="mt-6 text-center text-gray-400 text-sm">
          Don't have an account? <a href="/register" className="text-orange-500 hover:text-orange-400 font-semibold">Register here</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
