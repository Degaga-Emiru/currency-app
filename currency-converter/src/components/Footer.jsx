import React from 'react';

const Footer = ({ darkMode }) => {
  return (
    <footer className={`py-6 ${darkMode ? 'bg-gray-900 text-gray-400' : 'bg-gray-800 text-gray-300'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">World Currency Converter</h3>
            <p className="text-sm mt-1">© {new Date().getFullYear()} All Rights Reserved</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;