// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  // --- ESSENCIAL: Permite que o Modo Escuro funcione com a classe 'dark' ---
  darkMode: 'class', 
  // --- FIM ESSENCIAL ---
  
  content: [
    // Diz ao Tailwind quais arquivos ele deve escanear para procurar por classes
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}