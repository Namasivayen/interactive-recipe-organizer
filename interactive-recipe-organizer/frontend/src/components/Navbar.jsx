import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import LogoutButton from './LogoutButton';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white px-6 py-4 shadow flex justify-between items-center">
      <div className="flex gap-6 items-center">
        <Link to="/" className="font-bold text-2xl tracking-wide text-white hover:text-gray-300 transition">Recipe Organizer</Link>
  <Link to="/add" className="hover:text-gray-300 transition">Add Recipe</Link>
  <Link to="/recipes" className="hover:text-gray-300 transition">Recipe List</Link>
  <Link to="/profile" className="hover:text-gray-300 transition">Profile</Link>
      </div>
      <div>
        {user ? <LogoutButton /> : <Link to="/login" className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded transition">Login</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
