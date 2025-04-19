import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSun, FaMoon, FaExchangeAlt } from 'react-icons/fa';
import ReactCountryFlag from 'react-country-flag';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import the new components
import CurrencyCards from './components/CurrencyCards';
import AboutSection from './components/AboutSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(false);

  // Complete list of 164 world currencies with country codes
  const currencies = [
    { code: 'USD', name: 'United States Dollar', countryCode: 'US' },
    { code: 'EUR', name: 'Euro', countryCode: 'EU' },
    { code: 'GBP', name: 'British Pound', countryCode: 'GB' },
    { code: 'JPY', name: 'Japanese Yen', countryCode: 'JP' },
    { code: 'AUD', name: 'Australian Dollar', countryCode: 'AU' },
    { code: 'CAD', name: 'Canadian Dollar', countryCode: 'CA' },
    { code: 'CHF', name: 'Swiss Franc', countryCode: 'CH' },
    { code: 'CNY', name: 'Chinese Yuan', countryCode: 'CN' },
    { code: 'INR', name: 'Indian Rupee', countryCode: 'IN' },
    { code: 'SGD', name: 'Singapore Dollar', countryCode: 'SG' },
    { code: 'AED', name: 'UAE Dirham', countryCode: 'AE' },
    { code: 'AFN', name: 'Afghan Afghani', countryCode: 'AF' },
    { code: 'ALL', name: 'Albanian Lek', countryCode: 'AL' },
    { code: 'AMD', name: 'Armenian Dram', countryCode: 'AM' },
    { code: 'ANG', name: 'Netherlands Antillean Guilder', countryCode: 'AN' },
    { code: 'AOA', name: 'Angolan Kwanza', countryCode: 'AO' },
    { code: 'ARS', name: 'Argentine Peso', countryCode: 'AR' },
    { code: 'AWG', name: 'Aruban Florin', countryCode: 'AW' },
    { code: 'AZN', name: 'Azerbaijani Manat', countryCode: 'AZ' },
    { code: 'BAM', name: 'Bosnia-Herzegovina Convertible Mark', countryCode: 'BA' },
    { code: 'BBD', name: 'Barbadian Dollar', countryCode: 'BB' },
    { code: 'BDT', name: 'Bangladeshi Taka', countryCode: 'BD' },
    { code: 'BGN', name: 'Bulgarian Lev', countryCode: 'BG' },
    { code: 'BHD', name: 'Bahraini Dinar', countryCode: 'BH' },
    { code: 'BIF', name: 'Burundian Franc', countryCode: 'BI' },
    { code: 'BMD', name: 'Bermudan Dollar', countryCode: 'BM' },
    { code: 'BND', name: 'Brunei Dollar', countryCode: 'BN' },
    { code: 'BOB', name: 'Bolivian Boliviano', countryCode: 'BO' },
    { code: 'BRL', name: 'Brazilian Real', countryCode: 'BR' },
    { code: 'BSD', name: 'Bahamian Dollar', countryCode: 'BS' },
    { code: 'BTN', name: 'Bhutanese Ngultrum', countryCode: 'BT' },
    { code: 'BWP', name: 'Botswanan Pula', countryCode: 'BW' },
    { code: 'BYN', name: 'Belarusian Ruble', countryCode: 'BY' },
    { code: 'BZD', name: 'Belize Dollar', countryCode: 'BZ' },
    { code: 'CDF', name: 'Congolese Franc', countryCode: 'CD' },
    { code: 'CLP', name: 'Chilean Peso', countryCode: 'CL' },
    { code: 'COP', name: 'Colombian Peso', countryCode: 'CO' },
    { code: 'CRC', name: 'Costa Rican Colón', countryCode: 'CR' },
    { code: 'CUP', name: 'Cuban Peso', countryCode: 'CU' },
    { code: 'CVE', name: 'Cape Verdean Escudo', countryCode: 'CV' },
    { code: 'CZK', name: 'Czech Koruna', countryCode: 'CZ' },
    { code: 'DJF', name: 'Djiboutian Franc', countryCode: 'DJ' },
    { code: 'DKK', name: 'Danish Krone', countryCode: 'DK' },
    { code: 'DOP', name: 'Dominican Peso', countryCode: 'DO' },
    { code: 'DZD', name: 'Algerian Dinar', countryCode: 'DZ' },
    { code: 'EGP', name: 'Egyptian Pound', countryCode: 'EG' },
    { code: 'ERN', name: 'Eritrean Nakfa', countryCode: 'ER' },
    { code: 'ETB', name: 'Ethiopian Birr', countryCode: 'ET' },
    { code: 'FJD', name: 'Fijian Dollar', countryCode: 'FJ' },
    { code: 'FKP', name: 'Falkland Islands Pound', countryCode: 'FK' },
    { code: 'GEL', name: 'Georgian Lari', countryCode: 'GE' },
    { code: 'GHS', name: 'Ghanaian Cedi', countryCode: 'GH' },
    { code: 'GIP', name: 'Gibraltar Pound', countryCode: 'GI' },
    { code: 'GMD', name: 'Gambian Dalasi', countryCode: 'GM' },
    { code: 'GNF', name: 'Guinean Franc', countryCode: 'GN' },
    { code: 'GTQ', name: 'Guatemalan Quetzal', countryCode: 'GT' },
    { code: 'GYD', name: 'Guyanaese Dollar', countryCode: 'GY' },
    { code: 'HKD', name: 'Hong Kong Dollar', countryCode: 'HK' },
    { code: 'HNL', name: 'Honduran Lempira', countryCode: 'HN' },
    { code: 'HRK', name: 'Croatian Kuna', countryCode: 'HR' },
    { code: 'HTG', name: 'Haitian Gourde', countryCode: 'HT' },
    { code: 'HUF', name: 'Hungarian Forint', countryCode: 'HU' },
    { code: 'IDR', name: 'Indonesian Rupiah', countryCode: 'ID' },
    { code: 'ILS', name: 'Israeli New Shekel', countryCode: 'IL' },
    { code: 'IQD', name: 'Iraqi Dinar', countryCode: 'IQ' },
    { code: 'IRR', name: 'Iranian Rial', countryCode: 'IR' },
    { code: 'ISK', name: 'Icelandic Króna', countryCode: 'IS' },
    { code: 'JMD', name: 'Jamaican Dollar', countryCode: 'JM' },
    { code: 'JOD', name: 'Jordanian Dinar', countryCode: 'JO' },
    { code: 'KES', name: 'Kenyan Shilling', countryCode: 'KE' },
    { code: 'KGS', name: 'Kyrgystani Som', countryCode: 'KG' },
    { code: 'KHR', name: 'Cambodian Riel', countryCode: 'KH' },
    { code: 'KMF', name: 'Comorian Franc', countryCode: 'KM' },
    { code: 'KPW', name: 'North Korean Won', countryCode: 'KP' },
    { code: 'KRW', name: 'South Korean Won', countryCode: 'KR' },
    { code: 'KWD', name: 'Kuwaiti Dinar', countryCode: 'KW' },
    { code: 'KYD', name: 'Cayman Islands Dollar', countryCode: 'KY' },
    { code: 'KZT', name: 'Kazakhstani Tenge', countryCode: 'KZ' },
    { code: 'LAK', name: 'Laotian Kip', countryCode: 'LA' },
    { code: 'LBP', name: 'Lebanese Pound', countryCode: 'LB' },
    { code: 'LKR', name: 'Sri Lankan Rupee', countryCode: 'LK' },
    { code: 'LRD', name: 'Liberian Dollar', countryCode: 'LR' },
    { code: 'LSL', name: 'Lesotho Loti', countryCode: 'LS' },
    { code: 'LYD', name: 'Libyan Dinar', countryCode: 'LY' },
    { code: 'MAD', name: 'Moroccan Dirham', countryCode: 'MA' },
    { code: 'MDL', name: 'Moldovan Leu', countryCode: 'MD' },
    { code: 'MGA', name: 'Malagasy Ariary', countryCode: 'MG' },
    { code: 'MKD', name: 'Macedonian Denar', countryCode: 'MK' },
    { code: 'MMK', name: 'Myanmar Kyat', countryCode: 'MM' },
    { code: 'MNT', name: 'Mongolian Tugrik', countryCode: 'MN' },
    { code: 'MOP', name: 'Macanese Pataca', countryCode: 'MO' },
    { code: 'MRU', name: 'Mauritanian Ouguiya', countryCode: 'MR' },
    { code: 'MUR', name: 'Mauritian Rupee', countryCode: 'MU' },
    { code: 'MVR', name: 'Maldivian Rufiyaa', countryCode: 'MV' },
    { code: 'MWK', name: 'Malawian Kwacha', countryCode: 'MW' },
    { code: 'MXN', name: 'Mexican Peso', countryCode: 'MX' },
    { code: 'MYR', name: 'Malaysian Ringgit', countryCode: 'MY' },
    { code: 'MZN', name: 'Mozambican Metical', countryCode: 'MZ' },
    { code: 'NAD', name: 'Namibian Dollar', countryCode: 'NA' },
    { code: 'NGN', name: 'Nigerian Naira', countryCode: 'NG' },
    { code: 'NIO', name: 'Nicaraguan Córdoba', countryCode: 'NI' },
    { code: 'NOK', name: 'Norwegian Krone', countryCode: 'NO' },
    { code: 'NPR', name: 'Nepalese Rupee', countryCode: 'NP' },
    { code: 'NZD', name: 'New Zealand Dollar', countryCode: 'NZ' },
    { code: 'OMR', name: 'Omani Rial', countryCode: 'OM' },
    { code: 'PAB', name: 'Panamanian Balboa', countryCode: 'PA' },
    { code: 'PEN', name: 'Peruvian Sol', countryCode: 'PE' },
    { code: 'PGK', name: 'Papua New Guinean Kina', countryCode: 'PG' },
    { code: 'PHP', name: 'Philippine Peso', countryCode: 'PH' },
    { code: 'PKR', name: 'Pakistani Rupee', countryCode: 'PK' },
    { code: 'PLN', name: 'Polish Złoty', countryCode: 'PL' },
    { code: 'PYG', name: 'Paraguayan Guarani', countryCode: 'PY' },
    { code: 'QAR', name: 'Qatari Riyal', countryCode: 'QA' },
    { code: 'RON', name: 'Romanian Leu', countryCode: 'RO' },
    { code: 'RSD', name: 'Serbian Dinar', countryCode: 'RS' },
    { code: 'RUB', name: 'Russian Ruble', countryCode: 'RU' },
    { code: 'RWF', name: 'Rwandan Franc', countryCode: 'RW' },
    { code: 'SAR', name: 'Saudi Riyal', countryCode: 'SA' },
    { code: 'SBD', name: 'Solomon Islands Dollar', countryCode: 'SB' },
    { code: 'SCR', name: 'Seychellois Rupee', countryCode: 'SC' },
    { code: 'SDG', name: 'Sudanese Pound', countryCode: 'SD' },
    { code: 'SEK', name: 'Swedish Krona', countryCode: 'SE' },
    { code: 'SHP', name: 'St. Helena Pound', countryCode: 'SH' },
    { code: 'SLL', name: 'Sierra Leonean Leone', countryCode: 'SL' },
    { code: 'SOS', name: 'Somali Shilling', countryCode: 'SO' },
    { code: 'SRD', name: 'Surinamese Dollar', countryCode: 'SR' },
    { code: 'SSP', name: 'South Sudanese Pound', countryCode: 'SS' },
    { code: 'STN', name: 'São Tomé & Príncipe Dobra', countryCode: 'ST' },
    { code: 'SYP', name: 'Syrian Pound', countryCode: 'SY' },
    { code: 'SZL', name: 'Swazi Lilangeni', countryCode: 'SZ' },
    { code: 'THB', name: 'Thai Baht', countryCode: 'TH' },
    { code: 'TJS', name: 'Tajikistani Somoni', countryCode: 'TJ' },
    { code: 'TMT', name: 'Turkmenistani Manat', countryCode: 'TM' },
    { code: 'TND', name: 'Tunisian Dinar', countryCode: 'TN' },
    { code: 'TOP', name: 'Tongan Paʻanga', countryCode: 'TO' },
    { code: 'TRY', name: 'Turkish Lira', countryCode: 'TR' },
    { code: 'TTD', name: 'Trinidad & Tobago Dollar', countryCode: 'TT' },
    { code: 'TWD', name: 'New Taiwan Dollar', countryCode: 'TW' },
    { code: 'TZS', name: 'Tanzanian Shilling', countryCode: 'TZ' },
    { code: 'UAH', name: 'Ukrainian Hryvnia', countryCode: 'UA' },
    { code: 'UGX', name: 'Ugandan Shilling', countryCode: 'UG' },
    { code: 'UYU', name: 'Uruguayan Peso', countryCode: 'UY' },
    { code: 'UZS', name: 'Uzbekistani Som', countryCode: 'UZ' },
    { code: 'VES', name: 'Venezuelan Bolívar', countryCode: 'VE' },
    { code: 'VND', name: 'Vietnamese Đồng', countryCode: 'VN' },
    { code: 'VUV', name: 'Vanuatu Vatu', countryCode: 'VU' },
    { code: 'WST', name: 'Samoan Tala', countryCode: 'WS' },
    { code: 'XAF', name: 'Central African CFA Franc', countryCode: 'CF' },
    { code: 'XCD', name: 'East Caribbean Dollar', countryCode: 'AG' },
    { code: 'XOF', name: 'West African CFA Franc', countryCode: 'BJ' },
    { code: 'XPF', name: 'CFP Franc', countryCode: 'PF' },
    { code: 'YER', name: 'Yemeni Rial', countryCode: 'YE' },
    { code: 'ZAR', name: 'South African Rand', countryCode: 'ZA' },
    { code: 'ZMW', name: 'Zambian Kwacha', countryCode: 'ZM' },
    { code: 'ZWL', name: 'Zimbabwean Dollar', countryCode: 'ZW' }
  ];

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_API_KEY}/pair/${fromCurrency}/${toCurrency}`
        );
        
        if (response.data.result === "success") {
          setExchangeRate(response.data.conversion_rate);
        } else {
          throw new Error(response.data["error-type"]);
        }
      } catch (err) {
        toast.error(`API Error: ${err.message}`);
        console.error("API Error:", err);
        // Fallback rate (e.g., 0.85 for USD-EUR)
        setExchangeRate(0.85);
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
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">🌍 World Currency Converter</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>
  
        <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} mb-8`}>
          <div className="mb-6">
            <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
              min="0"
              step="0.01"
              placeholder="Enter the amount to convert"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* From Currency Selector */}
            <div className="relative">
              <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>From</label>
              <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <ReactCountryFlag 
                    countryCode={currencies.find(c => c.code === fromCurrency)?.countryCode || 'US'} 
                    svg 
                    style={{ width: '20px', height: '20px' }}
                  />
                </div>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className={`w-full p-3 pl-12 pr-8 rounded-lg appearance-none ${darkMode ? 
                    'bg-gray-700 border-gray-600 text-white' : 
                    'bg-white border-gray-300 text-gray-800'}
                    border focus:outline-none focus:ring-2 ${darkMode ? 
                    'focus:ring-blue-500' : 'focus:ring-blue-300'}`}
                >
                  {currencies.map((currency) => (
                    <option 
                      key={`from-${currency.code}`} 
                      value={currency.code}
                      className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
                    >
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
                <div className={`absolute inset-y-0 right-3 flex items-center pointer-events-none ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                 ▼
            </div>

              </div>
            </div>
  
            {/* Swap Button */}
            <div className="flex items-end justify-center pb-2">
              <button
                onClick={handleSwap}
                className={`p-3 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                <FaExchangeAlt size={18} />
              </button>
            </div>
  
            {/* To Currency Selector */}
            <div className="relative">
              <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>To</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ReactCountryFlag 
                    countryCode={currencies.find(c => c.code === toCurrency)?.countryCode || 'EU'} 
                    svg 
                    style={{ width: '20px', height: '20px' }}
                  />
                </div>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className={`w-full p-3 pl-12 pr-8 rounded-lg appearance-none ${darkMode ? 
                    'bg-gray-700 border-gray-600 text-white' : 
                    'bg-white border-gray-300 text-gray-800'}
                    border focus:outline-none focus:ring-2 ${darkMode ? 
                    'focus:ring-blue-500' : 'focus:ring-blue-300'}`}
                >
                  {currencies.map((currency) => (
                    <option 
                      key={`to-${currency.code}`} 
                      value={currency.code}
                      className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
                    >
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
                <div className={`absolute inset-y-0 right-3 flex items-center pointer-events-none ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                 ▼
            </div>
              </div>
            </div>
          </div>
  
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : exchangeRate && (
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <div className="text-2xl font-bold">
                {amount} {fromCurrency} = {(amount * exchangeRate).toFixed(2)} {toCurrency}
              </div>
              <div className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Add the new components */}
      <CurrencyCards darkMode={darkMode} />
      <AboutSection darkMode={darkMode} />
      <FAQSection darkMode={darkMode} />
      <Footer darkMode={darkMode} />
      <ToastContainer position="bottom-right" theme={darkMode ? 'dark' : 'light'} />
    </div>
  )
};
export default App;