// src/pages/PesqueiroDetalhe.jsx
// ATUALIZADO: Usa pesqueiro.galeria[0] para a imagem principal.

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_PESQUEIROS } from '../data/pesqueiros.js';
import { ArrowLeft, Star, Clock, MapPin, Heart, Send, Fish, Sun } from 'lucide-react';


// --- Componentes (ReviewCard e ReviewForm) - Mantidos para brevidade ---
const ReviewCard = ({ review }) => (
  <div className="bg-gray-50 dark:bg-gray-700 p-4 border rounded-lg mb-3 shadow-sm dark:border-gray-600">
    <div className="flex justify-between items-center mb-2">
      <p className="font-semibold text-gray-700 dark:text-gray-200">{review.user}</p>
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
    <p className="text-gray-600 dark:text-gray-400 italic">"{review.comment}"</p>
  </div>
);

const ReviewForm = ({ onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating > 0 && comment.trim() && userName.trim()) {
      const newReview = {
        id: Date.now(),
        user: userName.trim(),
        rating: rating,
        comment: comment.trim(),
      };
      
      onReviewSubmit(newReview);
      
      setRating(0);
      setComment('');
      setUserName('');
      alert("Comentário enviado com sucesso (salvo apenas nesta sessão)!");
    } else {
      alert("Por favor, preencha seu nome, dê uma nota e escreva um comentário.");
    }
  };

  return (
    <div className="border-t pt-6 mt-6 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Deixe sua Avaliação</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            <div className="flex items-center gap-2">
                <label className="font-medium text-gray-700 dark:text-gray-300">Nota:</label>
                <div className="flex">
                    {[1, 2, 3, 4, 5].map((starValue) => (
                        <Star 
                            key={starValue}
                            size={24}
                            className={`cursor-pointer ${starValue <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
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
                className="p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
            />

            <textarea
                placeholder="Seu Comentário sobre o pesqueiro..."
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
            />
            
            <button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700 transition duration-150 shadow-md"
            >
                Enviar Avaliação <Send size={18}/>
            </button>
        </form>
    </div>
  );
};
// --- FIM DOS COMPONENTES ---

const formatPrice = (price) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
};


export default function PesqueiroDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pesqueiro = MOCK_PESQUEIROS.find(p => p.id === parseInt(id));

  const [currentReviews, setCurrentReviews] = useState(pesqueiro ? pesqueiro.reviews : []);

  useEffect(() => {
    if (pesqueiro) {
        setCurrentReviews(pesqueiro.reviews);
    }
  }, [pesqueiro]);


  if (!pesqueiro) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold">Pesqueiro n├úo encontrado.</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-blue-600 flex items-center">
          <ArrowLeft size={20} className="mr-1" /> Voltar
        </button>
      </div>
    );
  }

  const handleReviewSubmit = (newReview) => {
    setCurrentReviews([newReview, ...currentReviews]);
  };

  const precoFormatado = formatPrice(pesqueiro.preco);
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${pesqueiro.lat},${pesqueiro.lng}`;


  return (
    <div className="flex flex-col h-full overflow-y-auto bg-white dark:bg-gray-900">

      {/* Imagem e Botão Voltar */}
      <div className="relative w-full h-64 overflow-hidden">
        <img
          // --- MUDANÇA AQUI: Usa o primeiro item da galeria ---
          src={pesqueiro.galeria[0]} 
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
            // Favoritos (Apenas est├®tico por enquanto)
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg text-red-500 hover:scale-105 transition"
        >
            <Heart size={24} fill="currentColor"/>
        </button>
      </div>

      {/* Conte├║do Principal */}
      <div className="p-4 flex-1">

        {/* T├¡tulo e Pre├ºo */}
        <div className="flex justify-between items-start mb-3 border-b pb-3 dark:border-gray-700">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{pesqueiro.nome}</h1>
            <div className="flex items-center text-gray-500 dark:text-gray-400 mt-1">
              <MapPin size={16} className="mr-1" />
              <p className="text-sm">{pesqueiro.cidade}</p>
            </div>
          </div>
          <p className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-500">{precoFormatado}</p>
        </div>

        {/* --- BOTÃO DE ROTA --- */}
        <a 
          href={googleMapsUrl}
          target="_blank" // Abre em uma nova aba (para não fechar o app)
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg mb-4 text-center hover:bg-blue-700 transition"
        >
          <MapPin size={20} className="mr-2" />
          Como Chegar (Abrir Google Maps)
        </a>
        {/* --- FIM BOTÃO DE ROTA --- */}


        {/* Avalia├º├úo e Hor├írio */}
        <div className="flex justify-between items-center mb-4 text-sm">
          <div className="flex items-center text-yellow-600">
            <Star size={18} fill="currentColor" className="mr-1"/>
            <span className="font-bold">{pesqueiro.aval}</span>
            <span className="text-gray-500 dark:text-gray-400 ml-1">({pesqueiro.avalCount} aval.)</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Clock size={16} className="mr-1"/>
            {pesqueiro.horario}
          </div>
        </div>

        {/* Descri├º├úo */}
        <p className="text-gray-700 dark:text-gray-300 mb-6 border-b pb-4 dark:border-gray-700">{pesqueiro.descricao}</p>

        {/* Peixes do Local */}
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Peixes do Local:</h3>
        <div className="flex flex-wrap gap-2 mb-6 border-b pb-4 dark:border-gray-700">
          {pesqueiro.peixes.map(peixe => (
            <span 
              key={peixe} 
              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs font-medium px-3 py-1 rounded-full"
            >
              <Fish size={14} className="inline mr-1"/> {peixe}
            </span>
          ))}
        </div>

        {/* --- Iscas Sugeridas --- */}
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Iscas Sugeridas:</h3>
        <div className="flex flex-wrap gap-2 mb-6 border-b pb-4 dark:border-gray-700">
          {pesqueiro.iscas_sugeridas.map((isca, i) => (
            <span 
              key={i} 
              className="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1"
            >
              <Fish size={14} className="inline mr-1"/> {isca}
            </span>
          ))}
        </div>
        {/* --- FIM Iscas Sugeridas --- */}

        {/* Avalia├º├Áes */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Avalia├º├Áes ({currentReviews.length})</h2>

        {/* Formul├írio de Review e Lista de Reviews */}
        <ReviewForm onReviewSubmit={handleReviewSubmit} />

        <div className="mt-6">
            {currentReviews.length > 0 ? (
                currentReviews.map(review => (
                    <ReviewCard key={review.id} review={review} />
                ))
            ) : (
                <p className="text-gray-500 dark:text-gray-400 italic mt-4">Nenhuma avalia├º├úo ainda. Seja o primeiro a comentar!</p>
            )}
        </div>

      </div>
    </div>
  );
}