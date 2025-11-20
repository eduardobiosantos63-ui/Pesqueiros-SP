// src/components/Layout.jsx
// ATUALIZADO: Classes dark: adicionadas para funcionar o modo escuro na navegação.

import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Search, Map, BookOpen, MoreVertical, LogOut } from 'lucide-react'; 
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
      // CLASSES DARK: Adicionamos a cor escura dos ícones e texto
      className={`flex-1 rounded-none flex flex-col h-16 justify-center items-center ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-emerald-700 dark:text-emerald-500'}`}
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
      
      {/* CLASSES DARK: Fundo da página */}
      <main className="flex-1 overflow-y-auto bg-white dark:bg-gray-800">
        <Outlet />
      </main>
      
      <MoreMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} /> 

      {/* CLASSES DARK: Fundo da navegação de baixo */}
      <nav className="flex justify-around bg-white dark:bg-gray-900 shadow-md border-t dark:border-gray-700">
        <NavButton to="/app"><Search size={20}/> <span>Buscar</span></NavButton>
        <NavButton to="/app/mapa"><Map size={20}/> <span>Mapa</span></NavButton>
        <NavButton to="/app/registro"><BookOpen size={20}/> <span>Diário</span></NavButton> 
        
        {/* BOTÃO MAIS (3 PONTOS) */}
        <button 
            onClick={() => setIsMenuOpen(true)}
            className={`flex-1 rounded-none flex flex-col h-16 justify-center items-center ${isMenuOpen ? 'text-blue-600 dark:text-blue-400' : 'text-emerald-700 dark:text-emerald-500'}`}
        >
            <MoreVertical size={20}/> <span>Mais</span>
        </button>

      </nav>
    </>
  );
}