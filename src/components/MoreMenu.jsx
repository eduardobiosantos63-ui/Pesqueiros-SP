// src/components/MoreMenu.jsx
// Menu de Mais Opções (Três Pontos)

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Heart, List, User, LogOut, Settings } from 'lucide-react';
import { logoutMock } from '../auth.js'; 

const MoreMenuItem = ({ to, text, icon: Icon }) => (
    <Link to={to} className="w-full flex items-center p-3 text-gray-700 hover:bg-gray-100 transition rounded-lg">
        <Icon size={20} className="mr-3 text-emerald-700" />
        <span className="flex-1">{text}</span>
        <ChevronRight size={18} className="text-gray-400" />
    </Link>
);

export default function MoreMenu({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        // Overlay de fundo semi-transparente
        <div className="fixed inset-0 bg-black/50 z-20" onClick={onClose}>
            
            {/* Menu Flutuante */}
            <div className="absolute bottom-16 right-4 w-64 bg-white rounded-xl shadow-2xl p-4 flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
                
                <p className="text-sm font-semibold text-gray-500 mb-2 border-b pb-1">Mais Opções</p>

                <MoreMenuItem to="/app/perfil" text="Meu Perfil" icon={User} />
                <MoreMenuItem to="/app/configuracoes" text="Configurações" icon={Settings} />
                <MoreMenuItem to="/app/favoritos" text="Meus Favoritos" icon={Heart} />
                <MoreMenuItem to="/app/pesqueiros" text="Lista Completa" icon={List} />
                
                <div className="border-t pt-3 mt-2">
                    <button 
                        onClick={logoutMock} 
                        className="w-full flex items-center p-3 text-red-500 hover:bg-red-50 rounded-lg transition"
                    >
                        <LogOut size={20} className="mr-3"/> 
                        Sair da Conta
                    </button>
                </div>
            </div>
        </div>
    );
}