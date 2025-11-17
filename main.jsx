// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' 
import './index.css' // <-- ADICIONE ESTA LINHA
import 'leaflet/dist/leaflet.css'; // (Essa linha do mapa já estava aí)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // Vamos chamar nosso app principal de 'App.jsx'

// Importe o CSS do Leaflet aqui
import 'leaflet/dist/leaflet.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)