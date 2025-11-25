// src/pages/Auth.jsx
// Final: Tela de Login/Cadastro com lógica simulada.

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginMock, isAuthenticated } from '../auth.js'; 
import { User, Lock, LogIn } from 'lucide-react';

export default function Auth() {
    const navigate = useNavigate();

    // Redirecionamento automático se já estiver logado
    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/app', { replace: true });
        }
    }, [navigate]);
    
    // Se estiver logado, não renderiza o formulário (o useEffect faz o resto)
    if (isAuthenticated()) {
        return <div className="flex items-center justify-center h-screen bg-gray-100"><p>Redirecionando...</p></div>;
    }

    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isLogin) {
            if (loginMock(username, password)) {
                navigate('/splash'); 
            } else {
                alert("Erro: Para teste, qualquer valor funciona, mas os campos não podem estar vazios.");
            }
        } 
        else {
            if (loginMock(username, password)) {
                navigate('/splash'); 
            } else {
                alert("Erro: Falha no cadastro (verifique os campos).");
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-8">
            
            <img src="/logo.png" alt="Logo Pesqueiros SP" className="h-28 w-auto mb-6" />
            <h1 className="text-3xl font-bold text-emerald-700 mb-2">{isLogin ? 'Fazer Login' : 'Criar Perfil'}</h1>
            <p className="text-gray-500 mb-8">{isLogin ? 'Entre para começar a pescar!' : 'Preencha seus dados (Simulação)'}</p>

            <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4">
                
                <div className="relative">
                    <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Nome de Usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-3 pl-10 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                
                <div className="relative">
                    <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 pl-10 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700 transition duration-150 shadow-md"
                >
                    {isLogin ? 'Entrar' : 'Cadastrar'} <LogIn size={18} />
                </button>
            </form>

            <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="mt-6 text-sm text-blue-600 hover:underline"
            >
                {isLogin ? 'Não tem conta? Crie seu perfil!' : 'Já tenho um perfil (Login)'}
            </button>
        </div>
    );
}