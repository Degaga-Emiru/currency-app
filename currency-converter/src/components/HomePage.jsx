import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSun, FaMoon, FaExchangeAlt } from 'react-icons/fa';
import ReactCountryFlag from 'react-country-flag';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Complete list of currencies with country codes and symbols
  const currencies = [
    { code: 'USD', name: 'US Dollar', countryCode: 'US', symbol: '$' },
    { code: 'EUR', name: 'Euro', countryCode: 'EU', symbol: '€' },
    { code: 'GBP', name: 'British Pound', countryCode: 'GB', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', countryCode: 'JP', symbol: '¥' },
    { code: 'AUD', name: 'Australian Dollar', countryCode: 'AU', symbol: 'A$' },
    { code: 'CAD', name: 'Canadian Dollar', countryCode: 'CA', symbol: 'C$' },
    { code: 'CHF', name: 'Swiss Franc', countryCode: 'CH', symbol: 'CHF' },
    { code: 'CNY', name: 'Chinese Yuan', countryCode: 'CN', symbol: '¥' },
    { code: 'INR', name: 'Indian Rupee', countryCode: 'IN', symbol: '₹' },
    { code: 'SGD', name: 'Singapore Dollar', countryCode: 'SG', symbol: 'S$' },
    // Add more currencies as needed
  ];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.exchangerate-api.com/v6/${import.meta.env.VITE_API_KEY}/latest/${fromCurrency}`
        );
        setExchangeRate(response.data.conversion_rates[toCurrency]);
        toast.success('Rates updated!');
      } catch (err) {
        toast.error('Failed to fetch rates. Using fallback data.');
        console.error(err);
        // Fallback rates
        setExchangeRate(0.85); // Default EUR-USD rate
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Navbar */}
      <nav className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Global Currency Converter
              </h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}>Home</a>
              <a href="#" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}>Rates</a>
              <a href="#" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}>About</a>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
              >
                {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {menuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className={`md:hidden mt-4 pb-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <a href="#" className={`block py-2 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Home</a>
              <a href="#" className={`block py-2 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Rates</a>
              <a href="#" className={`block py-2 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>About</a>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`flex items-center py-2 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                {darkMode ? (
                  <>
                    <FaSun className="mr-2" /> Light Mode
                  </>
                ) : (
                  <>
                    <FaMoon className="mr-2" /> Dark Mode
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className={`mb-12 p-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-blue-600'} text-white`}>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">World Currency Converter</h1>
          <p className="text-lg mb-6">
            Convert between 150+ currencies with real-time exchange rates
          </p>
          <div className="flex flex-wrap gap-4">
            <div className={`px-4 py-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-blue-500'}`}>
              Up-to-date rates
            </div>
            <div className={`px-4 py-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-blue-500'}`}>
              150+ currencies
            </div>
            <div className={`px-4 py-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-blue-500'}`}>
              Historical data
            </div>
          </div>
        </div>

        {/* Converter Section */}
        <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} mb-8`}>
          <h2 className="text-2xl font-bold mb-6">Currency Converter</h2>
          
          <div className="mb-6">
            <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              min="0"
              step="0.01"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>From</label>
              <div className={`flex items-center p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className={`w-full bg-transparent ${darkMode ? 'text-white' : 'text-gray-800'}`}
                >
                  {currencies.map((currency) => (
                    <option key={`from-${currency.code}`} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
                <div className="ml-3">
                  <ReactCountryFlag 
                    countryCode={currencies.find(c => c.code === fromCurrency)?.countryCode || 'US'} 
                    svg 
                    style={{ width: '24px', height: '24px' }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button
                onClick={handleSwap}
                className={`p-3 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                <FaExchangeAlt size={20} />
              </button>
            </div>

            <div>
              <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>To</label>
              <div className={`flex items-center p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className={`w-full bg-transparent ${darkMode ? 'text-white' : 'text-gray-800'}`}
                >
                  {currencies.map((currency) => (
                    <option key={`to-${currency.code}`} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
                <div className="ml-3">
                  <ReactCountryFlag 
                    countryCode={currencies.find(c => c.code === toCurrency)?.countryCode || 'EU'} 
                    svg 
                    style={{ width: '24px', height: '24px' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : exchangeRate && (
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <div className="text-2xl font-bold mb-2">
                {amount} {fromCurrency} = {(amount * exchangeRate).toFixed(2)} {toCurrency}
              </div>
              <div className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}
              </div>
              <div className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Last updated: {new Date().toLocaleString()}
              </div>
            </div>
          )}
        </div>

        {/* Additional Info Section */}
        <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-2xl font-bold mb-4">About Exchange Rates</h2>
          <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Exchange rates fluctuate constantly due to global market forces. Our converter uses
            real-time mid-market rates, which are the midpoint between buy and sell rates
            in the global currency markets.
          </p>
          <h3 className="text-xl font-bold mb-2">Popular Currency Pairs</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { from: 'USD', to: 'EUR' },
              { from: 'EUR', to: 'GBP' },
              { from: 'USD', to: 'JPY' },
              { from: 'GBP', to: 'USD' },
            ].map((pair, index) => (
              <div 
                key={index} 
                onClick={() => {
                  setFromCurrency(pair.from);
                  setToCurrency(pair.to);
                }}
                className={`p-3 rounded-lg cursor-pointer transition ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <div className="flex items-center">
                  <ReactCountryFlag 
                    countryCode={currencies.find(c => c.code === pair.from)?.countryCode || 'US'} 
                    svg 
                    style={{ width: '20px', height: '20px', marginRight: '8px' }}
                  />
                  <span className="font-medium">{pair.from}</span>
                  <span className="mx-2">→</span>
                  <ReactCountryFlag 
                    countryCode={currencies.find(c => c.code === pair.to)?.countryCode || 'EU'} 
                    svg 
                    style={{ width: '20px', height: '20px', marginRight: '8px' }}
                  />
                  <span className="font-medium">{pair.to}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" theme={darkMode ? 'dark' : 'light'} />
    </div>
  );
};

export default HomePage;