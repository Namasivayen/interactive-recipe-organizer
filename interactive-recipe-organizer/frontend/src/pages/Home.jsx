import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-gray-900 rounded-xl shadow-lg p-8 w-full max-w-xl text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">Home (Recipe Feed)</h2>
        {!user && (
          <div className="space-x-4 mb-4">
            <Link to="/login" className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded transition">Login</Link>
            <Link to="/register" className="bg-gray-800 hover:bg-black text-white font-semibold py-2 px-4 rounded transition">Register</Link>
          </div>
        )}
        {user && (
          <div className="space-y-4">
            <div className="text-lg mb-2">Welcome, <span className="font-bold text-gray-300">{user.username}</span>!</div>
            <div className="space-x-4">
              <Link to="/add" className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded transition">Add Recipe</Link>
              <Link to="/profile" className="bg-gray-800 hover:bg-black text-white font-semibold py-2 px-4 rounded transition">Profile</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
