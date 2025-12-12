import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import LogoutButton from './LogoutButton';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white px-8 py-5 shadow-2xl border-b border-gray-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex gap-8 items-center">
          <Link to="/" className="font-extrabold text-3xl tracking-wide bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text hover:from-orange-500 hover:to-red-600 transition-all">
            🍳 Recipe Hub
          </Link>
          <div className="hidden md:flex gap-6 items-center">
            <Link to="/add" className="hover:text-orange-400 transition-colors font-medium">➕ Add Recipe</Link>
            <Link to="/recipes" className="hover:text-orange-400 transition-colors font-medium">📚 Browse</Link>
            <Link to="/profile" className="hover:text-orange-400 transition-colors font-medium">👤 Profile</Link>
            {user?.isAdmin && (
              <Link to="/dashboard" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all font-semibold">
                📊 Dashboard
              </Link>
            )}
          </div>
        </div>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="hidden sm:block text-gray-300">👋 {user.username}</span>
              <LogoutButton />
            </div>
          ) : (
            <Link to="/login" className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-full shadow-lg hover:shadow-orange-500/50 transition-all">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
