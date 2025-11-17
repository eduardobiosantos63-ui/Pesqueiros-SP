// src/components/PesqueiroCard.jsx
// VERSÃO FINAL: As linhas 18 e 19 que davam erro foram removidas.

import React from 'react';
// AS LINHAS QUE CAUSAVAM O ERRO FORAM DELETADAS AQUI

import { MapPin, Star, Fish, Heart } from "lucide-react";
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext.jsx'; // Importa nosso hook

// Formata o preço (R$ 60,00)
const formatPrice = (price) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
};

export function PesqueiroCard({ pesqueiro }) {
  const { isFavorito, toggleFavorite } = useFavorites(); // Pega o estado do Contexto
  const p = pesqueiro; // Renomeia para 'p' para facilitar
  const isFav = isFavorito(p.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Impede o clique de navegar
    e.stopPropagation(); 
    toggleFavorite(p.id);
  };

  return (
    // O Card inteiro agora é um Link para a página de detalhes
    // MUDANÇA AQUI: Adicionado o prefixo /app
    <Link to={`/app/pesqueiro/${p.id}`} className="block mb-4">
      <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
        <img 
          src={p.imagemUrl} 
          alt={p.nome} 
          className="w-full h-32 object-cover" 
        />
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold">{p.nome}</h3>
              <p className="text-sm text-gray-600 flex items-center gap-1"><MapPin size={14} /> {p.cidade}</p>
            </div>
            <button onClick={handleFavoriteClick} aria-label="favoritar" className="p-1">
              <Heart size={20} className={isFav ? 'fill-red-500 text-red-500' : ''} />
            </button>
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={16} className="fill-yellow-500" />
              <span className="font-bold">{p.aval}</span>
              <span className="text-xs text-gray-500">({p.avalCount} aval.)</span>
            </div>
            <span className="text-lg font-bold text-green-600">{formatPrice(p.preco)}</span>
          </div>
          
          <div className="flex gap-2 mt-3">
            {p.peixes.slice(0, 3).map((peixe, i) => (
              <span key={i} className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                <Fish size={12} /> {peixe}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}