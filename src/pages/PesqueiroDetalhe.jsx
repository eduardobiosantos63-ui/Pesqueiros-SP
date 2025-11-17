// src/pages/PesqueiroDetalhe.jsx
// ATUALIZADO: Adiciona seção de Avaliações (Reviews) com formulário.

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_PESQUEIROS } from '../data/pesqueiros';
import { ArrowLeft, Star, Clock, MapPin, Heart, Send } from 'lucide-react';

// --- Componente para exibir uma Avaliação Individual ---
const ReviewCard = ({ review }) => (
  <div className="bg-gray-50 p-4 border rounded-lg mb-3 shadow-sm">
    <div className="flex justify-between items-center mb-2">
      <p className="font-semibold text-gray-700">{review.user}</p>
      <div className="flex items-center text-yellow-500">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            fill={i < review.rating ? 'currentColor' : 'none'} 
            strokeWidth={1.5}
          />
        ))}
      </div>
    </div>
    <p className="text-gray-600 italic">"{review.comment}"</p>
  </div>
);

// --- Componente de Formulário para Nova Avaliação (Simulada) ---
const ReviewForm = ({ onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating > 0 && comment.trim() && userName.trim()) {
      // Simula a submissão de um novo comentário
      const newReview = {
        id: Date.now(), // ID único baseado no tempo
        user: userName.trim(),
        rating: rating,
        comment: comment.trim(),
      };
      
      onReviewSubmit(newReview);
      
      // Limpa o formulário
      setRating(0);
      setComment('');
      setUserName('');
      alert("Comentário enviado com sucesso (salvo apenas nesta sessão)!");
    } else {
      alert("Por favor, preencha seu nome, dê uma nota e escreva um comentário.");
    }
  };

  return (
    <div className="border-t pt-6 mt-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Deixe sua Avaliação</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            <div className="flex items-center gap-2">
                <label className="font-medium text-gray-700">Nota:</label>
                <div className="flex">
                    {[1, 2, 3, 4, 5].map((starValue) => (
                        <Star 
                            key={starValue}
                            size={24}
                            className={`cursor-pointer ${starValue <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                            onClick={() => setRating(starValue)}
                        />
                    ))}
                </div>
            </div>

            <input
                type="text"
                placeholder="Seu Nome"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />

            <textarea
                placeholder="Seu Comentário sobre o pesqueiro..."
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
            
            <button 
                type="submit" 
                className="flex items-center justify-center gap-2 bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700 transition duration-150 shadow-md"
            >
                Enviar Avaliação <Send size={18}/>
            </button>
        </form>
    </div>
  );
};
// --- FIM DOS NOVOS COMPONENTES ---


export default function PesqueiroDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pesqueiro = MOCK_PESQUEIROS.find(p => p.id === parseInt(id));
  
  // Estado para armazenar as reviews originais + as novas reviews submetidas
  const [currentReviews, setCurrentReviews] = useState(pesqueiro ? pesqueiro.reviews : []);
  
  useEffect(() => {
    if (pesqueiro) {
        // Inicializa o estado com as reviews mockadas
        setCurrentReviews(pesqueiro.reviews);
    }
  }, [pesqueiro]);


  if (!pesqueiro) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold">Pesqueiro não encontrado.</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-blue-600 flex items-center">
          <ArrowLeft size={20} className="mr-1" /> Voltar
        </button>
      </div>
    );
  }

  // Função para adicionar uma nova review ao estado (simulação)
  const handleReviewSubmit = (newReview) => {
    setCurrentReviews([newReview, ...currentReviews]); // Adiciona a nova review no topo
  };

  // Preço formatado
  const precoFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(pesqueiro.preco);

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-white">
      
      {/* Imagem e Botão Voltar */}
      <div className="relative w-full h-64 overflow-hidden">
        <img 
          src={pesqueiro.imagemUrl} 
          alt={pesqueiro.nome} 
          className="w-full h-full object-cover"
        />
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-4 left-4 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition"
        >
          <ArrowLeft size={24} />
        </button>
        <button
            // Favoritos (Apenas estético por enquanto)
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg text-red-500 hover:scale-105 transition"
        >
            <Heart size={24} fill="currentColor"/>
        </button>
      </div>

      {/* Conteúdo Principal */}
      <div className="p-4 flex-1">
        
        {/* Título e Preço */}
        <div className="flex justify-between items-start mb-3 border-b pb-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{pesqueiro.nome}</h1>
            <div className="flex items-center text-gray-500 mt-1">
              <MapPin size={16} className="mr-1" /> 
              <p className="text-sm">{pesqueiro.cidade}</p>
            </div>
          </div>
          <p className="text-2xl font-extrabold text-emerald-700">{precoFormatado}</p>
        </div>

        {/* Avaliação e Horário */}
        <div className="flex justify-between items-center mb-4 text-sm">
          <div className="flex items-center text-yellow-600">
            <Star size={18} fill="currentColor" className="mr-1"/> 
            <span className="font-bold">{pesqueiro.aval}</span>
            <span className="text-gray-500 ml-1">({pesqueiro.avalCount} aval.)</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock size={16} className="mr-1"/> 
            {pesqueiro.horario}
          </div>
        </div>

        {/* Descrição */}
        <p className="text-gray-700 mb-6 border-b pb-4">{pesqueiro.descricao}</p>

        {/* Peixes do Local */}
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Peixes do Local:</h3>
        <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
          {pesqueiro.peixes.map(peixe => (
            <span 
              key={peixe} 
              className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full"
            >
              {peixe}
            </span>
          ))}
        </div>

        {/* --- NOVO: Seção de Avaliações --- */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Avaliações ({currentReviews.length})</h2>

        {/* Formulário de Review */}
        <ReviewForm onReviewSubmit={handleReviewSubmit} />
        
        {/* Lista de Reviews */}
        <div className="mt-6">
            {currentReviews.length > 0 ? (
                currentReviews.map(review => (
                    <ReviewCard key={review.id} review={review} />
                ))
            ) : (
                <p className="text-gray-500 italic mt-4">Nenhuma avaliação ainda. Seja o primeiro a comentar!</p>
            )}
        </div>
        
      </div>
    </div>
  );
}