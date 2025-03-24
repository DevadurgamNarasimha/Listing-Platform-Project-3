import React, { useState, useEffect } from "react";
import { FavoritesContext } from './favoritesContextApi';

// Create the provider component
export const FavoritesProvider = ({ children }) => {
  // Get favorites from local storage or initialize as empty array
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Save to local storage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Check if a property is already in favorites
  const isFavorite = (propertyId) => {
    return favorites.some(property => property.id === propertyId);
  };

  // Add a property to favorites
  const addToFavorites = (property) => {
    if (!isFavorite(property.id)) {
      setFavorites(prevFavorites => [...prevFavorites, property]);
    }
  };

  // Remove a property from favorites
  const removeFromFavorites = (propertyId) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(property => property.id !== propertyId)
    );
  };

  // Toggle a property in favorites (add if not present, remove if present)
  const toggleFavorite = (property) => {
    if (isFavorite(property.id)) {
      removeFromFavorites(property.id);
    } else {
      addToFavorites(property);
    }
  };

  // Clear all favorites
  const clearFavorites = () => {
    setFavorites([]);
  };

  // Context value
  const contextValue = {
    favorites,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    clearFavorites
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
}; 