import { useContext } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { toast } from 'react-toastify'
import FavoritesContext from '../contexts/FavoritesContext'

export default function FavoriteButton({ fromCurrency, toCurrency }) {
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext)
  const isFavorite = favorites.some(
    fav => fav.from === fromCurrency && fav.to === toCurrency
  )

  const handleToggleFavorite = () => {
    const pair = { from: fromCurrency, to: toCurrency }
    if (isFavorite) {
      removeFavorite(pair)
      toast.success('Removed from favorites!')
    } else {
      addFavorite(pair)
      toast.success('Added to favorites!')
    }
  }

  return (
    <button
      onClick={handleToggleFavorite}
      className={`p-2 rounded-full ${isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
    </button>
  )
}