// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // --- ADICIONADO PARA CORRIGIR O PATH DE ASSETS NO VERCEL ---
  base: '/', 
  publicDir: 'public', 
  // --- FIM ADICIONADO ---
  plugins: [react()],
})