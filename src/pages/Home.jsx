// src/pages/Home.jsx
// ATUALIZADO: Classes dark: adicionadas.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star } from 'lucide-react';

export default function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); 
    if (query.trim()) {
      navigate(`/app/pesqueiros?q=${encodeURIComponent(query)}`);
    } else {
      navigate('/app/pesqueiros');
    }
  };

  return (
    <div className="flex flex-col h-full">
      
      {/* LOGO E TÍTULO */}
      <div className="flex flex-col items-center pt-8 pb-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <img src="/logo.png" alt="Logo Pesqueiros SP" className="h-20 w-auto" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">Pesqueiros SP</h1>
        
        <p className="text-gray-600 dark:text-gray-400 text-center mt-2 px-4 italic">
            Encontre o pesqueiro ideal e descubra a isca que garante a fisgada.
        </p>
      </div>

      {/* Barra de Busca */}
      <div className="p-4 bg-white dark:bg-gray-800 shadow-sm">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            // CLASSES DARK: Fundo da busca e texto
            className="flex-1 p-4 border rounded-xl shadow-inner bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Buscar por nome ou cidade..."
          />
          <button type="submit" className="h-full w-14 rounded-xl shadow-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700">
            <Search size={24} />
          </button>
        </form>
      </div>

      {/* Atalhos Rápidos */}
      <div className="p-4 bg-gray-50 dark:bg-gray-900 flex-1">
        <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Atalhos</h3>
        <div className="grid grid-cols-2 gap-4">
          
          <Link to="/app/mapa" className="h-24 text-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 border rounded-lg shadow-sm flex items-center justify-center gap-2">
            <MapPin /> Perto de Mim
          </Link>
          
          <Link to="/app/pesqueiros?ordenacao=avaliacao" className="h-24 text-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 border rounded-lg shadow-sm flex items-center justify-center gap-2">
            <Star /> Melhores Avaliados
          </Link>

        </div>
      </div>

    </div>
  );
}