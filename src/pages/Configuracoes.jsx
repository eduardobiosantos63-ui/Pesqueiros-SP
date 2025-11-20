// src/pages/Configuracoes.jsx
// Versão corrigida com a lógica de Medida e Limpar Dados Locais

import React, { useState, useEffect } from 'react';
import { ChevronLeft, Fish, Bell, Scale, ToggleLeft, ToggleRight, Trash2 } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';

// Chaves para o localStorage
const USER_SETTINGS_KEY = 'user_settings';
const CATCH_LOG_KEY = 'catch_log_entries';
const FAV_PESQUEIROS_KEY = 'fav_pesqueiros';


// Função para carregar as configurações do localStorage
const loadSettings = () => {
    try {
        const rawSettings = localStorage.getItem(USER_SETTINGS_KEY);
        return rawSettings ? JSON.parse(rawSettings) : {
            isPesqueESolte: true,
            receberNotificacoes: true,
            unidade: 'metric', // Padrão Métrica (kg/cm)
        };
    } catch (e) {
        return { isPesqueESolte: true, receberNotificacoes: true, unidade: 'metric' };
    }
};

// Componente para o Toggle Switch
const SettingsToggle = ({ label, icon, value, onToggle }) => {
    const Icon = icon;
    const ToggleIcon = value ? ToggleRight : ToggleLeft;
    
    return (
        <div className="flex justify-between items-center bg-white p-4 border-b">
            <div className="flex items-center text-gray-700">
                <Icon size={20} className="mr-3 text-emerald-700" />
                <span>{label}</span>
            </div>
            <button onClick={onToggle} aria-label={`Toggle ${label}`} className="p-1">
                <ToggleIcon size={30} className={value ? "text-blue-600" : "text-gray-400"} fill="currentColor" />
            </button>
        </div>
    );
};

// Componente: Dropdown de Seleção
const SettingsSelect = ({ label, icon: Icon, value, onChange }) => (
    <div className="flex justify-between items-center bg-white p-4 border-b">
        <div className="flex items-center text-gray-700">
            <Icon size={20} className="mr-3 text-emerald-700" />
            <span>{label}</span>
        </div>
        <select 
            value={value} 
            onChange={onChange} 
            className="p-2 border rounded-lg text-sm bg-gray-50"
        >
            <option value="metric">Métrica (kg / cm)</option>
            <option value="imperial">Imperial (lb / in)</option>
        </select>
    </div>
);


export default function Configuracoes() {
  const [settings, setSettings] = useState(loadSettings);
  const navigate = useNavigate();

  // Efeito para salvar as configurações sempre que elas mudam
  useEffect(() => {
    try {
        localStorage.setItem(USER_SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
        console.error("Could not save settings to localStorage", e);
    }
  }, [settings]);


  const toggleSetting = (key) => {
    setSettings(prev => ({
        ...prev,
        [key]: !prev[key] 
    }));
  };
  
  const handleUnitChange = (e) => {
    setSettings(prev => ({
        ...prev,
        unidade: e.target.value 
    }));
  };

  // Lógica para limpar dados
  const handleClearData = () => {
    if (window.confirm("ATENÇÃO: Isso apagará FAVORITOS, CONFIGURAÇÕES e REGISTROS DE PESCA salvos. Você tem certeza?")) {
        // Apaga todas as chaves que usamos no app
        localStorage.removeItem(USER_SETTINGS_KEY);
        localStorage.removeItem(CATCH_LOG_KEY);
        localStorage.removeItem(FAV_PESQUEIROS_KEY);

        // Apaga o token de login para forçar um novo login
        localStorage.removeItem('auth_token'); 

        alert("Dados locais apagados com sucesso! Reiniciando app.");
        window.location.reload(); // Força a recarga para voltar à tela de Login
    }
  };


  return (
    <div className="flex flex-col h-full bg-gray-100">
        
        {/* Cabeçalho Fixo com Botão Voltar */}
        <div className="bg-white p-4 shadow-sm border-b flex items-center">
            <button onClick={() => navigate(-1)} className="mr-4 text-gray-600">
                <ChevronLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Configurações</h1>
        </div>

        <div className="flex-1 p-4 space-y-4">
            
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Preferências de Pesca</h3>
            
            <div className="border rounded-xl shadow-sm overflow-hidden bg-white">
                
                {/* Seleção de Unidade */}
                <SettingsSelect
                    label="Unidade de Medida Padrão"
                    icon={Scale}
                    value={settings.unidade}
                    onChange={handleUnitChange}
                />
                
                {/* Toggles Existentes */}
                <SettingsToggle
                    label="Pesca Esportiva (Pesque e Solte)"
                    icon={Fish}
                    value={settings.isPesqueESolte}
                    onToggle={() => toggleSetting('isPesqueESolte')}
                />
                
                <SettingsToggle
                    label="Notificações de Eventos e Reposição"
                    icon={Bell}
                    value={settings.receberNotificacoes}
                    onToggle={() => toggleSetting('receberNotificacoes')}
                />

            </div>

            {/* Seção de Manutenção (Danger Zone) */}
            <h3 className="text-lg font-semibold mt-6 mb-3 text-red-700">Manutenção</h3>
            
            <div className="border border-red-300 rounded-xl shadow-sm overflow-hidden bg-white">
                <button 
                    onClick={handleClearData}
                    className="w-full flex items-center p-4 text-red-600 hover:bg-red-50 transition"
                >
                    <Trash2 size={20} className="mr-3" />
                    Limpar Todos os Dados Locais
                </button>
            </div>

        </div>
    </div>
  );
}