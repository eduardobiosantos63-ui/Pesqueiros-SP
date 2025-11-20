// src/pages/Perfil.jsx
// CORRIGIDO: Caminho para auth.js agora é ../auth.js

import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Settings, HelpCircle, LogOut } from 'lucide-react';
import { logoutMock } from '../auth.js'; // <-- CAMINHO FINAL CORRETO

// Componente de item de menu reutilizável
const ProfileMenuItem = ({ icon, text, to }) => {
    const Icon = icon;
    return (
        <Link to={to} className="w-full justify-between h-14 text-lg flex items-center p-2 rounded-lg hover:bg-gray-100">
          <div className="flex items-center">
            <Icon className="mr-4 text-emerald-700" size={22} />
            <span>{text}</span>
          </div>
          <ChevronRight size={22} className="text-gray-400" />
        </Link>
    );
};

export default function Perfil() {
  
  const handleLogout = () => {
    logoutMock(); // Usa a lógica de logout real
  };

  return (
    <div className="flex flex-col h-full bg-white">
      
      {/* 1. Cabeçalho do Perfil */}
      <div className="bg-gray-100 p-6 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-emerald-700 text-white flex items-center justify-center mb-3">
          <span className="text-4xl font-bold">D</span>
        </div>
        <h2 className="text-2xl font-bold">Olá, Du!</h2>
        <p className="text-gray-600">eduardobiosantos63@gmail.com (Mock)</p>
      </div>

      {/* 2. Menu de Opções */}
      <div className="flex-1 p-4 space-y-4">
        
        {/* Seção de Atalhos */}
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Minha Conta</h3>
        <div className="border rounded-xl shadow-sm overflow-hidden">
            <ProfileMenuItem 
                icon={Star} 
                text="Meus Favoritos" 
                to="/app/favoritos" 
            />
            
            {/* O LINK QUE VOCÊ ESTAVA PROCURANDO */}
            <ProfileMenuItem 
                icon={Settings} 
                text="Configurações do App" 
                to="/app/configuracoes" 
            />

            <ProfileMenuItem 
                icon={HelpCircle} 
                text="Sobre e Termos" 
                to="/app/perfil"
            />
        </div>
        
        {/* Botão de Sair */}
        <div className="mt-8">
            <button 
                className="w-full h-14 text-lg text-red-500 border border-red-500 hover:bg-red-50 rounded-xl flex items-center justify-center"
                onClick={handleLogout}
            >
                <LogOut className="mr-4" size={22} />
                Sair
            </button>
        </div>

      </div>
    </div>
  );
}