// src/auth/auth.js
// Lógica de Autenticação Falsa (Mock)

const AUTH_TOKEN_KEY = 'auth_token';

export const loginMock = (username, password) => {
    // Simulação: qualquer usuário e senha não vazios funcionam
    if (username.trim() && password.trim()) {
        const mockToken = 'mock-user-' + Date.now();
        localStorage.setItem(AUTH_TOKEN_KEY, mockToken);
        return true;
    }
    return false;
};

export const logoutMock = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    // Recarrega a página para voltar à tela de Login/Auth
    window.location.href = '/'; 
};

export const isAuthenticated = () => {
    return !!localStorage.getItem(AUTH_TOKEN_KEY);
};