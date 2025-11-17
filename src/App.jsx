// src/App.jsx
// Lógica de Rotas ATUALIZADA: Adicionada rota para a tela Splash.

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import { Layout } from './components/Layout.jsx';

// Importe suas páginas
import Splash from './pages/Splash.jsx'; // <-- NOVO IMPORT: A tela de Splash
import Home from './pages/Home.jsx';
import PesqueirosLista from './pages/PesqueirosLista.jsx';
import PesqueiroDetalhe from './pages/PesqueiroDetalhe.jsx';
import Favoritos from './pages/Favoritos.jsx';
import Mapa from './pages/Mapa.jsx';
import Perfil from './pages/Perfil.jsx';

export default function App() { // <-- NOTE AQUI: O nome do componente é 'App'
  return (
    <FavoritesProvider>
      <Router>
        <div className="max-w-md mx-auto h-screen bg-gray-50 flex flex-col shadow-lg">
          <Routes>
            
            {/* Rota inicial agora é a tela Splash (sem o Layout) */}
            <Route path="/" element={<Splash />} /> 

            {/* As rotas do app AGORA estão aninhadas em /app */}
            <Route path="/app" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="pesqueiros" element={<PesqueirosLista />} />
              <Route path="pesqueiro/:id" element={<PesqueiroDetalhe />} />
              <Route path="favoritos" element={<Favoritos />} />
              <Route path="mapa" element={<Mapa />} />
              <Route path="perfil" element={<Perfil />} />
            </Route>
            
          </Routes>
        </div>
      </Router>
    </FavoritesProvider>
  );
}