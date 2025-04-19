import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

const AboutSection = ({ darkMode }) => {
  return (
    <div className={`py-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <h2 className={`flex items-center justify-center text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          <FaInfoCircle className="mr-2" /> About Our Currency Converter
        </h2>
        <div className={`max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <p className="mb-4">
            Our currency converter provides real-time exchange rates for over 160 world currencies. 
            We source our data from reliable financial institutions.
          </p>
          <p>
            Whether you're traveling abroad or making international payments, our tool helps you 
            make informed financial decisions with up-to-date exchange rates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;