// src/pages/Registro.jsx
// ATUALIZADO: Adiciona funcionalidade de Foto de Captura (Salva em Base64)

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PESQUEIROS, todosPeixes } from '../data/pesqueiros.js';
import { ChevronLeft, Save, Fish, MapPin, Camera } from 'lucide-react'; // Adicionei Camera

// Chave para salvar no localStorage
const CATCH_LOG_KEY = 'catch_log_entries';

// Função para carregar logs do localStorage
const loadCatchLogs = () => {
    try {
        const rawLogs = localStorage.getItem(CATCH_LOG_KEY);
        return rawLogs ? JSON.parse(rawLogs) : [];
    } catch (e) {
        return [];
    }
};

export default function Registro() {
    const navigate = useNavigate();
    const [logEntries, setLogEntries] = useState(loadCatchLogs);
    
    const [data, setData] = useState({
        pesqueiroId: '',
        peixe: '',
        peso: '',
        tamanho: '',
        fotoBase64: null, // <-- NOVO: Campo para a foto em Base64
    });

    // Efeito para salvar os logs sempre que a lista mudar
    useEffect(() => {
        try {
            localStorage.setItem(CATCH_LOG_KEY, JSON.stringify(logEntries));
        } catch (e) {
            console.error("Could not save catch log to localStorage", e);
        }
    }, [logEntries]);
    
    // --- NOVO: Lógica para converter a foto em Base64 ---
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Salva a string Base64 no estado
                setData(prev => ({ ...prev, fotoBase64: reader.result }));
            };
            // Lê o arquivo como uma URL de dados (Base64)
            reader.readAsDataURL(file);
        }
    };
    // --- FIM NOVO ---

    // Lógica para submeter o novo registro
    const handleSubmit = (e) => {
        e.preventDefault();
        const pesqueiroSelecionado = MOCK_PESQUEIROS.find(p => p.id === parseInt(data.pesqueiroId));
        
        if (!pesqueiroSelecionado || !data.peixe || !data.peso || !data.tamanho) {
            alert("Por favor, preencha todos os campos obrigatórios (Pesqueiro, Peixe, Peso e Tamanho).");
            return;
        }

        const newEntry = {
            id: Date.now(),
            data: new Date().toLocaleDateString('pt-BR'),
            pesqueiro: pesqueiroSelecionado.nome,
            peixe: data.peixe,
            peso: `${data.peso} kg`,
            tamanho: `${data.tamanho} cm`,
            fotoBase64: data.fotoBase64, // <-- SALVA A STRING BASE64
        };

        setLogEntries(prev => [newEntry, ...prev]); // Adiciona o novo log no topo
        
        // Limpa o formulário e a foto
        setData({ pesqueiroId: '', peixe: '', peso: '', tamanho: '', fotoBase64: null });
        // Resetar o campo de input de arquivo é complexo, então deixamos o campo limpo no DOM.
        alert(`Registro de ${newEntry.peixe} salvo com sucesso!`);
    };
    
    // Seleciona o primeiro pesqueiro como padrão
    useEffect(() => {
        if (MOCK_PESQUEIROS.length > 0 && !data.pesqueiroId) {
            setData(prev => ({ ...prev, pesqueiroId: MOCK_PESQUEIROS[0].id.toString() }));
        }
    }, [data.pesqueiroId]);


    // Componente simples para mostrar a lista de capturas
    const LogList = () => (
        <div className="mt-8 border-t pt-4">
            <h3 className="text-xl font-bold mb-3">Histórico de Capturas ({logEntries.length})</h3>
            {logEntries.length === 0 && <p className="text-gray-500 italic">Nenhum peixe registrado ainda.</p>}
            
            {logEntries.map(log => (
                <div key={log.id} className="bg-white p-4 border rounded-lg mb-3 shadow-sm">
                    {log.fotoBase64 && ( // <-- NOVO: Se tiver foto, mostra
                        <img 
                            src={log.fotoBase64} 
                            alt={log.peixe} 
                            className="w-full h-32 object-cover rounded-md mb-3" 
                        />
                    )}
                    <p className="font-semibold text-gray-800 flex justify-between items-center">
                        <span className="text-lg">{log.peixe}</span>
                        <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">{log.data}</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                        {log.peso} • {log.tamanho}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center mt-2">
                        <MapPin size={12} className="mr-1"/> {log.pesqueiro}
                    </p>
                </div>
            ))}
        </div>
    );

    return (
        <div className="flex flex-col h-full overflow-y-auto bg-gray-100">
            {/* Cabeçalho Fixo com Botão Voltar */}
            <div className="bg-white p-4 shadow-sm border-b flex items-center">
                <button onClick={() => navigate(-1)} className="mr-4 text-gray-600">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-2xl font-bold text-gray-800">Diário de Pesca</h1>
            </div>

            <div className="flex-1 p-4">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Registrar Nova Captura</h2>

                <form onSubmit={handleSubmit} className="bg-white p-4 border rounded-xl shadow-md mb-6">
                    
                    {/* Pesqueiro */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Local da Pesca:</label>
                        <select
                            value={data.pesqueiroId}
                            onChange={(e) => setData({ ...data, pesqueiroId: e.target.value })}
                            className="w-full p-3 border rounded-lg bg-gray-50"
                            required
                        >
                            {MOCK_PESQUEIROS.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Tipo de Peixe */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Peixe:</label>
                        <select
                            value={data.peixe}
                            onChange={(e) => setData({ ...data, peixe: e.target.value })}
                            className="w-full p-3 border rounded-lg bg-gray-50"
                            required
                        >
                            <option value="">Selecione o Peixe</option>
                            {todosPeixes.map(peixe => (
                                <option key={peixe} value={peixe}>
                                    {peixe}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Peso e Tamanho */}
                    <div className="flex gap-4 mb-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Peso (kg):</label>
                            <input
                                type="number"
                                step="0.1"
                                placeholder="Ex: 1.5"
                                value={data.peso}
                                onChange={(e) => setData({ ...data, peso: e.target.value })}
                                className="w-full p-3 border rounded-lg bg-gray-50"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tamanho (cm):</label>
                            <input
                                type="number"
                                placeholder="Ex: 45"
                                value={data.tamanho}
                                onChange={(e) => setData({ ...data, tamanho: e.target.value })}
                                className="w-full p-3 border rounded-lg bg-gray-50"
                                required
                            />
                        </div>
                    </div>
                    
                    {/* --- NOVO: Campo de Foto --- */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Foto da Captura (Opcional):</label>
                        <div className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50">
                            <Camera size={20} className="text-gray-600"/>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </div>
                        {data.fotoBase64 && (
                            <img src={data.fotoBase64} alt="Pré-visualização da captura" className="mt-3 w-32 h-32 object-cover rounded-md border" />
                        )}
                    </div>
                    {/* --- FIM NOVO --- */}

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white p-3 rounded-xl font-bold hover:bg-emerald-700 transition duration-150 shadow-lg"
                    >
                        Salvar Captura <Save size={18} />
                    </button>
                </form>

                {/* Histórico de Logs */}
                <LogList />

            </div>
        </div>
    );
}