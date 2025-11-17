// src/pages/Favoritos.jsx
import React from 'react';
import { useFavorites } from '../context/FavoritesContext.jsx';
import { MOCK_PESQUEIROS } from '../data/pesqueiros.js';
import { PesqueiroCard } from '../components/PesqueiroCard.jsx';

export default function Favoritos() {
  const { favoritos } = useFavorites();

  const listaFavoritos = MOCK_PESQUEIROS.filter(p => favoritos.includes(p.id));

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Meus Favoritos</h2>

      {listaFavoritos.length === 0 ? (
        <p className="text-center text-gray-500">
          Você ainda não adicionou nenhum pesqueiro aos favoritos.
        </p>
      ) : (
        listaFavoritos.map(p => (
          <PesqueiroCard key={p.id} pesqueiro={p} />
        ))
      )}
    </div>
  );
}