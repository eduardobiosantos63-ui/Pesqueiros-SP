// src/pages/Splash.jsx
// CORRIGIDO: Caminho para auth.js agora é ../auth.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../auth.js'; // <-- CAMINHO FINAL CORRETO

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
        navigate('/');
        return;
    }
    
    const timer = setTimeout(() => {
      navigate('/app'); 
    }, 2000); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-emerald-700">
      <img src="/logo.png" alt="Logo Pesqueiros SP" className="h-40 w-auto mb-4 animate-pulse" />
      <h1 className="text-4xl font-bold text-white">Pesqueiros SP</h1>
      <p className="text-white mt-2 text-lg">Carregando...</p>
    </div>
  );
}