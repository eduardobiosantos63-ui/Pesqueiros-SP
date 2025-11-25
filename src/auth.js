// src/auth/auth.js
// Lógica de Autenticação Falsa (Mock) e Premium

const AUTH_TOKEN_KEY = 'auth_token';
const PREMIUM_KEY = 'is_premium'; 

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
    localStorage.removeItem(PREMIUM_KEY); // Remove status premium
    window.location.href = '/'; 
};

export const isAuthenticated = () => {
    return !!localStorage.getItem(AUTH_TOKEN_KEY);
};

export const goPremium = () => {
    localStorage.setItem(PREMIUM_KEY, 'true');
    window.location.reload(); 
};

export const isPremium = () => {
    return !!localStorage.getItem(PREMIUM_KEY);
};