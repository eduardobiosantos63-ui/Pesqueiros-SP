// src/pages/Perfil.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Settings, HelpCircle, LogOut } from 'lucide-react';

// Um componente de item de menu reutilizável
const ProfileMenuItem = ({ icon, text, to }) => {
  const Icon = icon;

  return (
    <Link to={to} className="w-full justify-between h-14 text-lg flex items-center p-2 rounded-lg hover:bg-gray-100">
      <div className="flex items-center">
        <Icon className="mr-4" size={22} />
        <span>{text}</span>
      </div>
      <ChevronRight size={22} className="text-gray-400" />
    </Link>
  );
};

export default function Perfil() {

  const handleLogout = () => {
    alert("Função 'Sair' clicada!");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-100 p-6 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center mb-3">
          <span className="text-4xl font-bold">D</span>
        </div>
        <h2 className="text-2xl font-bold">Olá, Du!</h2>
        <p className="text-gray-600">email.do.usuario@gmail.com</p>
      </div>

      <div className="flex-1 p-4 space-y-2">
        <ProfileMenuItem 
          icon={Star} 
          text="Meus Favoritos" 
          to="/favoritos" 
        />

        <ProfileMenuItem 
          icon={Settings} 
          text="Configurações da Conta" 
          to="/perfil" // Linka para si mesmo
        />

        <ProfileMenuItem 
          icon={HelpCircle} 
          text="Ajuda e Suporte" 
          to="/perfil" // Linka para si mesmo
        />

        <button 
          className="w-full h-14 text-lg text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600 flex items-center p-2 rounded-lg"
          onClick={handleLogout}
        >
          <LogOut className="mr-4" size={22} />
          Sair
        </button>
      </div>

      <footer className="text-center p-4 text-gray-400 text-xs">
        App Pesqueiros SP - Versão 1.0.0
      </footer>
    </div>
  );
}