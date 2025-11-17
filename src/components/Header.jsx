// src/components/Header.jsx
// ATUALIZADO com a imagem do novo logo.

import React from 'react';
// import { Fish } from 'lucide-react'; // Não precisamos mais do ícone de peixe

export function Header() {
  return (
    // Aqui usamos a nossa Cor Principal (verde-escuro)
    <header className="bg-emerald-700 text-white p-4 flex items-center shadow-md">
      {/* Usamos a tag <img> para exibir o nosso logo.png */}
      <img src="/logo.png" alt="Logo Pesqueiros SP" className="h-8 w-auto mr-3" />
      <h1 className="text-2xl font-bold">Pesqueiros SP</h1>
    </header>
  );
}