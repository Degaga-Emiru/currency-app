// this is Favorite Components 
import { createContext, useState, useEffect } from 'react'

export const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('currencyFavorites')
    if (saved) setFavorites(JSON.parse(saved))
  }, [])

  const saveFavorites = (newFavorites) => {
    setFavorites(newFavorites)
    localStorage.setItem('currencyFavorites', JSON.stringify(newFavorites))
  }

  const addFavorite = (pair) => {
    if (!favorites.some(fav => fav.from === pair.from && fav.to === pair.to)) {
      saveFavorites([...favorites, pair])
    }
  }

  const removeFavorite = (pair) => {
    saveFavorites(favorites.filter(
      fav => !(fav.from === pair.from && fav.to === pair.to)
    ))
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}
