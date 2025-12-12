import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto px-4 mb-12">
        <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-transparent bg-clip-text animate-pulse">
          🍳 Recipe Organizer
        </h1>
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          Discover, Create, and Share Amazing Recipes with Food Lovers Around the World
        </p>
        
        {!user && (
          <div className="flex gap-6 justify-center mb-12">
            <Link 
              to="/login" 
              className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-full shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link 
              to="/register" 
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Register
            </Link>
          </div>
        )}
        
        {user && (
          <div className="space-y-6">
            <div className="text-2xl mb-6">
              Welcome back, <span className="font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">{user.username}</span>! 👋
            </div>
            <div className="flex gap-6 justify-center flex-wrap">
              <Link 
                to="/add" 
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-full shadow-2xl hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300"
              >
                ➕ Add Recipe
              </Link>
              <Link 
                to="/recipes" 
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-full shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300"
              >
                📚 Browse Recipes
              </Link>
              <Link 
                to="/profile" 
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-full shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300"
              >
                👤 Profile
              </Link>
            </div>
          </div>
        )}
      </div>
      
      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 mt-12">
        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/30 hover:border-orange-500/60 transform hover:scale-105 transition-all duration-300">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold mb-3 text-white">Discover</h3>
          <p className="text-gray-300">Browse thousands of recipes from cuisines around the world</p>
        </div>
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-8 border border-green-500/30 hover:border-green-500/60 transform hover:scale-105 transition-all duration-300">
          <div className="text-5xl mb-4">✍️</div>
          <h3 className="text-2xl font-bold mb-3 text-white">Create</h3>
          <p className="text-gray-300">Share your own recipes and culinary masterpieces</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 hover:border-blue-500/60 transform hover:scale-105 transition-all duration-300">
          <div className="text-5xl mb-4">💬</div>
          <h3 className="text-2xl font-bold mb-3 text-white">Connect</h3>
          <p className="text-gray-300">Engage with food lovers and share your experiences</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
