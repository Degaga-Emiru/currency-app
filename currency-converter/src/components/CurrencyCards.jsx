//contain the Currency card of some countires
import React from 'react';

const currencyCards = [
  {
    title: "US Dollar (USD)",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/125px-Flag_of_the_United_States.svg.png",
    description: "The US Dollar is the world's primary reserve currency."
  },
  {
    title: "Euro (EUR)",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/125px-Flag_of_Europe.svg.png",
    description: "The Euro is used by 19 European Union countries."
  },
  {
    title: "British Pound (GBP)",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/125px-Flag_of_the_United_Kingdom.svg.png",
    description: "The Pound Sterling is the oldest currency still in use."
  }
];

const CurrencyCards = ({ darkMode }) => {
  return (
    <div className={`py-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4">
        <h2 className={`text-2xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Major World Currencies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currencyCards.map((card, index) => (
            <div key={index} className={`rounded-lg overflow-hidden shadow-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
              <img src={card.image} alt={card.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {card.title}
                </h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrencyCards;
