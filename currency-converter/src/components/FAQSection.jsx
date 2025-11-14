//contain the faq section of the website
import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

const faqs = [
  {
    question: "How often are rates updated?",
    answer: "Rates update every minute from live market data."
  },
  {
    question: "Is there any fee?",
    answer: "No, our converter is completely free to use."
  }
];

const FAQSection = ({ darkMode }) => {
  return (
    <div className={`py-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4">
        <h2 className={`text-2xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className={`mb-4 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow`}>
              <h3 className={`flex items-center text-lg font-semibold mb-2 ${darkMode ? 'text-yellow-300' : 'text-blue-600'}`}>
                <FaQuestionCircle className="mr-2" /> {faq.question}
              </h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
