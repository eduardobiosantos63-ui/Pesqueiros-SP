// src/App.jsx
// ATUALIZADO: Lógica de Dark Mode Simplificada no componente App.

import React, { useEffect } from 'react'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import { Layout } from './components/Layout.jsx';
import { isAuthenticated } from './auth.js'; 

// Importe suas páginas
import Auth from './pages/Auth.jsx'; 
import Splash from './pages/Splash.jsx'; 
import Home from './pages/Home.jsx';
import PesqueirosLista from './pages/PesqueirosLista.jsx';
import PesqueiroDetalhe from './pages/PesqueiroDetalhe.jsx';
import Favoritos from './pages/Favoritos.jsx';
import Mapa from './pages/Mapa.jsx';
import Perfil from './pages/Perfil.jsx';
import Configuracoes from './pages/Configuracoes.jsx';
import Registro from './pages/Registro.jsx';


// Lógica para aplicar/remover a classe 'dark' no HTML root
const USER_SETTINGS_KEY = 'user_settings'; 

const applyThemeFromStorage = () => {
    try {
        const rawSettings = localStorage.getItem(USER_SETTINGS_KEY);
        const isDark = rawSettings ? JSON.parse(rawSettings).isDarkMode : false; 

        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    } catch (e) {
        // Ignora
    }
};


// Componente de Proteção de Rotas (Não muda)
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />; 
  }
  return children;
};


export default function App() {
    
    // 1. Aplica o tema imediatamente na montagem e monitora mudanças no localStorage
    // A LÓGICA AGORA ESTÁ DIRETO AQUI
    useEffect(() => {
        applyThemeFromStorage();
        
        window.addEventListener('storage', applyThemeFromStorage); 
        
        return () => window.removeEventListener('storage', applyThemeFromStorage);
    }, []);
    
    
  return (
    <FavoritesProvider>
      <Router>
        {/* Adicionamos a classe 'dark:bg-gray-900' para que o fundo escuro cubra a tela inteira quando o modo escuro estiver ativo */}
        <div className="max-w-md mx-auto h-screen bg-gray-50 flex flex-col shadow-lg dark:bg-gray-900">
              <Routes>
                
                <Route path="/" element={<Auth />} /> 
                <Route path="/splash" element={<Splash />} /> 

                {/* Rotas Protegidas (Só acessa se estiver logado) */}
                <Route path="/app" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                  <Route index element={<Home />} />
                  <Route path="pesqueiros" element={<PesqueirosLista />} />
                  <Route path="pesqueiro/:id" element={<PesqueiroDetalhe />} />
                  <Route path="favoritos" element={<Favoritos />} />
                  <Route path="mapa" element={<Mapa />} />
                  <Route path="perfil" element={<Perfil />} />
                  <Route path="configuracoes" element={<Configuracoes />} />
                  <Route path="registro" element={<Registro />} />
                </Route>
                
              </Routes>
        </div>
      </Router>
    </FavoritesProvider>
  );
}