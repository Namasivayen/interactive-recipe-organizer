import React from 'react';

const Footer = () => (
  <footer className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-gray-300 text-center py-6 mt-8 shadow-inner">
    <span className="tracking-wide">&copy; {new Date().getFullYear()} Recipe Organizer</span>
  </footer>
);

export default Footer;
