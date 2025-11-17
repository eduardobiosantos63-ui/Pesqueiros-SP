// src/pages/Mapa.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MOCK_PESQUEIROS } from '../data/pesqueiros.js';
import { Link } from 'react-router-dom';
import { Icon } from 'leaflet';

// --- Correção de Ícone ---
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const customIcon = new Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
// --- Fim da Correção ---

const defaultCenter = [MOCK_PESQUEIROS[0].lat, MOCK_PESQUEIROS[0].lng];

export default function Mapa() {

  return (
    <MapContainer 
      center={defaultCenter} 
      zoom={10}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {MOCK_PESQUEIROS.map((p) => (
        <Marker 
          key={p.id} 
          position={[p.lat, p.lng]} 
          icon={customIcon}
        >
          <Popup>
            <div className="text-center">
              <h4 className="font-bold">{p.nome}</h4>
              <p>{p.cidade}</p>
              <Link 
                to={`/pesqueiro/${p.id}`} 
                className="text-blue-600 underline mt-2 inline-block"
              >
                Ver detalhes
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}