import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  return (
    <button 
      onClick={logout}
      className="px-6 py-2 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-bold rounded-full shadow-lg hover:shadow-red-500/50 transition-all transform hover:scale-105"
    >
      🚪 Logout
    </button>
  );
};

export default LogoutButton;
