// src/components/Layout.jsx
// CORRIGIDO: O erro 'isActive is a constant' foi resolvido (trocamos const por let).

import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Search, Map, List, Heart, User } from 'lucide-react';
import { Header } from './Header.jsx'; 

// Componente de Navegação customizado (CORRIGIDO)
const NavButton = ({ to, children }) => {
  const location = useLocation();
  
  // Trocamos 'const' por 'let' para permitir a reatribuição (resolvendo o aviso)
  let isActive = location.pathname.startsWith(to);

  // Regra especial para a Home do App (/app)
  if (to === "/app") {
      // Ativo se o caminho for exatamente '/app' ou '/app/' E não estiver na rota raiz ('/')
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
  return (
    <>
      <Header /> 
      
      <main className="flex-1 overflow-y-auto bg-white">
        <Outlet />
      </main>

      <nav className="flex justify-around bg-white shadow-md border-t">
        {/* TODOS OS LINKS APONTAM PARA /app/NOME_DA_PAGINA */}
        <NavButton to="/app"><Search size={20}/> <span>Buscar</span></NavButton>
        <NavButton to="/app/mapa"><Map size={20}/> <span>Mapa</span></NavButton>
        <NavButton to="/app/pesqueiros"><List size={20}/> <span>Pesqueiros</span></NavButton>
        <NavButton to="/app/favoritos"><Heart size={20}/> <span>Favoritos</span></NavButton>
        <NavButton to="/app/perfil"><User size={20}/> <span>Perfil</span></NavButton>
      </nav>
    </>
  );
}