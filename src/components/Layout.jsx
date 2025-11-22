// src/components/Layout.jsx
// ATUALIZADO: Botão 'Buscar' mudado para 'Início' com ícone de casa.

import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
// HOME ADICIONADO AQUI
import { Search, Map, List, Heart, User, LogOut, BookOpen, Home, MoreVertical } from 'lucide-react'; 
import { Header } from './Header.jsx'; 
import MoreMenu from './MoreMenu.jsx'; 
import { logoutMock } from '../auth.js'; 

// Componente de Navegação customizado 
const NavButton = ({ to, children }) => {
  const location = useLocation();
  let isActive = location.pathname.startsWith(to);

  if (to === "/app") {
      isActive = location.pathname === "/app" || location.pathname === "/app/";
  }
  
  return (
    <NavLink 
      to={to}
      className={`flex-1 rounded-none flex flex-col h-16 justify-center items-center ${isActive ? 'text-blue-600' : 'text-emerald-700'}`}
    >
      {children}
    </NavLink>
  );
}

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Header /> 
      
      <main className="flex-1 overflow-y-auto bg-white">
        <Outlet />
      </main>
      
      <MoreMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} /> 

      {/* Navegação de baixo (4 abas + Menu Mais) */}
      <nav className="flex justify-around bg-white shadow-md border-t">
        {/* MUDANÇA AQUI: Search -> Home e Buscar -> Início */}
        <NavButton to="/app"><Home size={20}/> <span>Início</span></NavButton> 
        <NavButton to="/app/mapa"><Map size={20}/> <span>Mapa</span></NavButton>
        <NavButton to="/app/pesqueiros"><List size={20}/> <span>Pesqueiros</span></NavButton>
        <NavButton to="/app/registro"><BookOpen size={20}/> <span>Diário</span></NavButton> 
        
        {/* BOTÃO MAIS (3 PONTOS) */}
        <button 
            onClick={() => setIsMenuOpen(true)}
            className={`flex-1 rounded-none flex flex-col h-16 justify-center items-center ${isMenuOpen ? 'text-blue-600' : 'text-emerald-700'}`}
        >
            <MoreVertical size={20}/> <span>Mais</span>
        </button>

      </nav>
    </>
  );
}