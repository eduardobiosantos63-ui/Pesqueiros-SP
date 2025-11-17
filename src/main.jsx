import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // Vamos chamar nosso app principal de 'App.jsx'
import './index.css' //
// Importe o CSS do Leaflet aqui
import 'leaflet/dist/leaflet.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)