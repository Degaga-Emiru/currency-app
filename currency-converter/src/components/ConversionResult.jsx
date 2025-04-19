export default function ConversionResult({ amount, fromCurrency, toCurrency, exchangeRate, loading, error }) {
    if (error) return <div className="text-red-500">{error}</div>
    if (loading) return <div className="text-center">Loading...</div>
  
    const convertedAmount = (amount * exchangeRate).toFixed(2)
  
    return (
      <div className="bg-blue-50 p-4 rounded">
        <div className="text-lg mb-2">
          {amount} {fromCurrency} = {convertedAmount} {toCurrency}
        </div>
        <div className="text-sm text-gray-600">
          Exchange Rate: 1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}
        </div>
      </div>
    )
  }