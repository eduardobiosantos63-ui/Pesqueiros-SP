// src/pages/Home.jsx
// ATUALIZADO: Adicionado o botão "Todos os Pesqueiros"

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, List } from 'lucide-react'; // <-- NOVO: Importamos List

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
      
      {/* --- LOGO E TÍTULO --- */}
      <div className="flex flex-col items-center pt-8 pb-4 bg-white">
        <img src="/logo.png" alt="Logo Pesqueiros SP" className="h-20 w-auto" />
        <h1 className="text-3xl font-bold text-gray-800 mt-2">Pesqueiros SP</h1>
        
        <p className="text-gray-600 text-center mt-2 px-4 italic">
            Encontre o pesqueiro ideal e descubra a isca que garante a fisgada.
        </p>
      </div>
      {/* --- FIM DO LOGO --- */}

      {/* 1. Barra de Busca */}
      <div className="p-4 bg-white shadow-sm">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 p-4 border rounded-xl shadow-inner bg-gray-50"
            placeholder="Buscar por nome ou cidade..."
          />
          <button type="submit" className="h-full w-14 rounded-xl shadow-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700">
            <Search size={24} />
          </button>
        </form>
      </div>

      {/* 2. Atalhos Rápidos */}
      <div className="p-4 bg-gray-50 flex-1">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Atalhos Rápidos</h3>
        
        {/* Grid de dois itens */}
        <div className="grid grid-cols-2 gap-4">
          
          <Link to="/app/mapa" className="h-24 text-lg bg-white border rounded-lg shadow-sm flex flex-col items-center justify-center gap-2">
            <MapPin size={24} /> Perto de Mim
          </Link>
          
          <Link to="/app/pesqueiros?ordenacao=avaliacao" className="h-24 text-lg bg-white border rounded-lg shadow-sm flex flex-col items-center justify-center gap-2">
            <Star size={24} /> Melhores Avaliados
          </Link>

        </div>
        
        {/* --- NOVO BOTÃO: TODOS OS PESQUEIROS --- */}
        <Link to="/app/pesqueiros" className="mt-4 w-full h-14 text-lg bg-blue-600 text-white font-bold rounded-lg shadow-md flex items-center justify-center hover:bg-blue-700 transition">
            <List size={20} className="mr-2" />
            Todos os Pesqueiros
        </Link>
        {/* --- FIM NOVO BOTÃO --- */}

      </div>

    </div>
  );
}