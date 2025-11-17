// src/pages/PesqueirosLista.jsx
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MOCK_PESQUEIROS, todasCidades, todosPeixes } from '../data/pesqueiros.js';
import { PesqueiroCard } from '../components/PesqueiroCard.jsx';

const allPrices = MOCK_PESQUEIROS.map(p => p.preco);
const maxPriceValue = Math.max(...allPrices);

const formatPrice = (price) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(price);
};

export default function PesqueirosLista() {
  const [searchParams] = useSearchParams();

  const initialQuery = searchParams.get('q') || "";
  const initialOrdenacao = searchParams.get('ordenacao') || "default";

  const [query, setQuery] = useState(initialQuery);
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");
  const [peixeSelecionado, setPeixeSelecionado] = useState("");
  const [ordenacao, setOrdenacao] = useState(initialOrdenacao);
  const [maxPreco, setMaxPreco] = useState(maxPriceValue); 

  const filteredAndSorted = useMemo(() => {
    return MOCK_PESQUEIROS
      .filter((p) => {
        const matchQuery =
          p.nome.toLowerCase().includes(query.toLowerCase()) ||
          p.cidade.toLowerCase().includes(query.toLowerCase());
        const matchCidade = cidadeSelecionada === "" || p.cidade === cidadeSelecionada;
        const matchPeixe = peixeSelecionado === "" || p.peixes.includes(peixeSelecionado);
        const matchPreco = p.preco <= maxPreco;
        return matchQuery && matchCidade && matchPeixe && matchPreco;
      })
      .sort((a, b) => {
        switch (ordenacao) {
          case "avaliacao":
            return b.aval - a.aval;
          case "nome_asc":
            return a.nome.localeCompare(b.nome);
          case "nome_desc":
            return b.nome.localeCompare(a.nome);
          default:
            return a.id - b.id;
        }
      });
  }, [query, cidadeSelecionada, peixeSelecionado, ordenacao, maxPreco]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Encontre seu Pesqueiro</h2>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 border rounded-xl mb-4"
        placeholder="Buscar por nome ou cidade..."
      />

      <div className="flex gap-2 mb-4">
        <select
          value={cidadeSelecionada}
          onChange={(e) => setCidadeSelecionada(e.target.value)}
          className="flex-1 p-3 border rounded-xl bg-white"
        >
          <option value="">Todas as Cidades</option>
          {todasCidades.map((cidade) => (
            <option key={cidade} value={cidade}>{cidade}</option>
          ))}
        </select>

        <select
          value={peixeSelecionado}
          onChange={(e) => setPeixeSelecionado(e.target.value)}
          className="flex-1 p-3 border rounded-xl bg-white"
        >
          <option value="">Todos os Peixes</option>
          {todosPeixes.map((peixe) => (
            <option key={peixe} value={peixe}>{peixe}</option>
          ))}
        </select>
      </div>

      <div className="mb-4 p-3 border rounded-xl bg-white">
        <label htmlFor="price-slider" className="flex justify-between items-center text-sm text-gray-700">
          <span>Preço Máximo:</span>
          <span className="font-bold text-blue-600">{formatPrice(maxPreco)}</span>
        </label>
        <input
          id="price-slider"
          type="range"
          min={0}
          max={maxPriceValue}
          value={maxPreco}
          onChange={(e) => setMaxPreco(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="ordenacao" className="text-sm text-gray-600 mr-2">Ordenar por:</label>
        <select
          id="ordenacao"
          value={ordenacao}
          onChange={(e) => setOrdenacao(e.target.value)}
          className="p-2 border rounded-xl bg-white"
        >
          <option value="default">Padrão</option>
          <option value="avaliacao">Melhor Avaliação</option>
          <option value="nome_asc">Nome (A-Z)</option>
          <option value="nome_desc">Nome (Z-A)</option>
        </select>
      </div>

      {filteredAndSorted.length === 0 && (
        <p className="text-center text-gray-500">Nenhum pesqueiro encontrado.</p>
      )}

      {filteredAndSorted.map((p) => (
        <PesqueiroCard key={p.id} pesqueiro={p} />
      ))}
    </div>
  );
}