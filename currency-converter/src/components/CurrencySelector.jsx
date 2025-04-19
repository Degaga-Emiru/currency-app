import {  useState } from 'react'
const allCurrencies = [
  'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD',
  'MXN', 'SGD', 'HKD', 'NOK', 'KRW', 'TRY', 'INR', 'BRL', 'ZAR', 'RUB'
]

export default function CurrencySelector({ 
  label, 
  currency, 
  setCurrency, 
  multiMode, 
  currencies, 
  setCurrencies 
}) {
  const [newCurrency, setNewCurrency] = useState('')

  const handleAddCurrency = () => {
    if (newCurrency && !currencies.includes(newCurrency)) {
      setCurrencies([...currencies, newCurrency])
      setNewCurrency('')
    }
  }

  const handleRemoveCurrency = (currToRemove) => {
    setCurrencies(currencies.filter(curr => curr !== currToRemove))
  }

  return (
    <div>
      <label className="block mb-2 font-medium">{label}</label>
      
      {multiMode ? (
        <div>
          <div className="flex mb-2">
            <select
              value={newCurrency}
              onChange={(e) => setNewCurrency(e.target.value)}
              className="flex-1 p-2 border rounded-l"
            >
              <option value="">Select currency</option>
              {allCurrencies
                .filter(curr => !currencies.includes(curr))
                .map((curr) => (
                  <option key={curr} value={curr}>{curr}</option>
                ))}
            </select>
            <button
              onClick={handleAddCurrency}
              disabled={!newCurrency}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 rounded-r disabled:bg-gray-300"
            >
              Add
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {currencies.map((curr) => (
              <div key={curr} className="flex items-center bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded">
                <span>{curr}</span>
                <button
                  onClick={() => handleRemoveCurrency(curr)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {allCurrencies.map((curr) => (
            <option key={curr} value={curr}>{curr}</option>
          ))}
        </select>
      )}
    </div>
  )
}