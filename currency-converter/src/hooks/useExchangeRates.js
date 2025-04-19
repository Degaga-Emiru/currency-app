import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useExchangeRates(baseCurrency, targetCurrencies) {
  const [rates, setRates] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await axios.get(
          `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`
        )
        
        const filteredRates = {}
        targetCurrencies.forEach(currency => {
          filteredRates[currency] = response.data.rates[currency]
        })
        
        setRates(filteredRates)
      } catch (err) {
        setError('Failed to fetch exchange rates')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchRates()
  }, [baseCurrency, targetCurrencies])

  return { rates, loading, error }
}