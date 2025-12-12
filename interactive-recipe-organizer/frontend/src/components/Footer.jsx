import React from 'react';

const Footer = () => (
  <footer className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-gray-300 py-8 mt-12 border-t border-gray-700">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center">
        <div className="text-3xl mb-3">🍳</div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text mb-2">
          Recipe Hub
        </h3>
        <p className="text-gray-400 mb-4">Discover, Create, and Share Amazing Recipes</p>
        <div className="flex justify-center gap-6 mb-4 text-2xl">
          <span className="hover:text-orange-400 cursor-pointer transition-colors">👍</span>
          <span className="hover:text-orange-400 cursor-pointer transition-colors">💙</span>
          <span className="hover:text-orange-400 cursor-pointer transition-colors">🍽️</span>
        </div>
        <div className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Recipe Organizer. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
