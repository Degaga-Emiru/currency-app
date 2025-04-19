import { useState, useEffect } from 'react'
import axios from 'axios'
import { format, subDays } from 'date-fns'
import DatePicker from './DatePicker'

export default function HistoricalRates({ fromCurrency, toCurrency }) {
  const [rates, setRates] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [startDate, setStartDate] = useState(subDays(new Date(), 7))
  const [endDate, setEndDate] = useState(new Date())

  useEffect(() => {
    const fetchHistoricalRates = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Note: This is a simplified example. Actual API might require different endpoint
        const response = await axios.get(
          `https://api.exchangerate-api.com/v4/historical/${fromCurrency}/${format(startDate, 'yyyy-MM-dd')}`
        )
        
        const historicalData = Object.entries(response.data.rates)
          .filter(([date]) => {
            const currentDate = new Date(date)
            return currentDate >= startDate && currentDate <= endDate
          })
          .map(([date, rateData]) => ({
            date,
            rate: rateData[toCurrency]
          }))
          .sort((a, b) => new Date(a.date) - new Date(b.date))

        setRates(historicalData)
      } catch (err) {
        setError('Failed to fetch historical rates. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchHistoricalRates()
  }, [fromCurrency, toCurrency, startDate, endDate])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Historical Exchange Rates</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <DatePicker 
          label="Start Date" 
          selectedDate={startDate} 
          onChange={setStartDate} 
          maxDate={endDate}
        />
        <DatePicker 
          label="End Date" 
          selectedDate={endDate} 
          onChange={setEndDate} 
          minDate={startDate}
          maxDate={new Date()}
        />
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p>Loading historical data...</p>
        </div>
      ) : rates.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Rate</th>
              </tr>
            </thead>
            <tbody>
              {rates.map(({ date, rate }) => (
                <tr key={date} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-2">{format(new Date(date), 'MMM dd, yyyy')}</td>
                  <td className="px-4 py-2">{rate?.toFixed(6) || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          No historical data available for the selected period.
        </div>
      )}
    </div>
  )
}