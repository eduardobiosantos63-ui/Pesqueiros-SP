// src/context/FavoritesContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favoritos, setFavoritos] = useState(() => {
    try {
      const raw = localStorage.getItem("fav_pesqueiros");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("fav_pesqueiros", JSON.stringify(favoritos));
    } catch (e) {}
  }, [favoritos]);

  const toggleFavorite = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isFavorito = (id) => {
    return favoritos.includes(id);
  }

  const value = {
    favoritos,
    toggleFavorite,
    isFavorito
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}