// src/data/pesqueiros.js
// VERSÃO 3.0: Com campo 'reviews' para comentários!

export const MOCK_PESQUEIROS = [
  {
    id: 1,
    nome: "Pesqueiro Sakura",
    cidade: "Embu-Guaçu - SP",
    preco: 30, 
    horario: "Qua-Dom: 07:00-18:00", 
    aval: 4.6, 
    avalCount: 2020, 
    peixes: ["Tambaqui", "Pacu", "Tilápia", "Carpa"],
    imagemUrl: "/images/foto1.webp",
    descricao: "Estr. Mathias Schmidt, 777. Ambiente familiar com piscinas, pedalinhos e restaurante.",
    lat: -23.8376408, 
    lng: -46.7876175,
    reviews: [ // <-- NOVO CAMPO
        { id: 1, user: "Mariana Souza", rating: 5, comment: "Lugar lindo e muito organizado. Os tanques são grandes e a equipe muito atenciosa." },
        { id: 2, user: "Pedro Viana", rating: 4, comment: "Ótimo para família, mas a fila do restaurante estava longa no domingo." }
    ]
  },
  {
    id: 2,
    nome: "Pesqueiro do Galego",
    cidade: "Embu-Guaçu - SP",
    preco: 40, 
    horario: "Todos os dias: 07:00-17:00", 
    aval: 4.4, 
    avalCount: 1143, 
    peixes: ["Tilápia", "Pacu", "Tambaqui", "Carpa", "Pintado"],
    imagemUrl: "/images/foto2.webp",
    descricao: "Av. Ernesto João Marcelino, 2177. Natureza abundante, parquinho para crianças e ótimo restaurante.",
    lat: -23.8143426, 
    lng: -46.8015003,
    reviews: [ // <-- NOVO CAMPO
        { id: 1, user: "Rafael Costa", rating: 5, comment: "O Tambaqui aqui é gigantesco! Vale a pena a pesca esportiva." },
        { id: 2, user: "Ana Clara", rating: 3, comment: "Bom lugar, mas a área de parquinho precisa de manutenção." }
    ]
  },
  {
    id: 3,
    nome: "Pesqueiro do Bonito",
    cidade: "Embu-Guaçu - SP",
    preco: 40, 
    horario: "Ter-Dom: 07:00-17:00", 
    aval: 4.5, 
    avalCount: 419, 
    peixes: ["Traira", "Tambaqui", "Carpa", "Tilapia"],
    imagemUrl: "/images/foto3.webp",
    descricao: "R. Tia Zulmira, 200. Conhecido pelo ambiente tranquilo e boa pescaria esportiva.",
    lat: -23.8428039, 
    lng: -46.7896118,
    reviews: [ // <-- NOVO CAMPO
        { id: 1, user: "João Carlos", rating: 4, comment: "Voltei a semana passada, peguei 3 traíras grandes! Recomendo." }
    ]
  },
  {
    id: 4,
    nome: "Pesqueiro Nossa Senhora de Fátima",
    cidade: "Embu-Guaçu - SP",
    preco: 25, 
    horario: "Todos os dias: 07:00-17:30", 
    aval: 4.3, 
    avalCount: 150, 
    peixes: ["Tilápia", "Pacu", "Carpa", "Tambacu"],
    imagemUrl: "/images/foto4.webp",
    descricao: "Estr. Luiz Mentone, 868. Um pesqueiro tradicional na região, ideal para quem busca um dia de paz e pesca.",
    lat: -23.8606095, 
    lng: -46.7792521,
    reviews: [] // Sem comentários por enquanto
  },
  {
    id: 5,
    nome: "Fish Country",
    cidade: "Embu-Guaçu - SP",
    preco: 60, 
    horario: "Todos os dias: 08:00-18:00", 
    aval: 4.1, 
    avalCount: 210, 
    peixes: ["Tambaqui", "Carpa", "Tilapia", "Pintado"],
    imagemUrl: "/images/foto5.webp",
    descricao: "Estrada Santa Rita, km 49. Pesqueiro com boa estrutura e lagos para diferentes tipos de pesca.",
    lat: -23.867592, 
    lng: -46.825371,
    reviews: [ // <-- NOVO CAMPO
        { id: 1, user: "Marcos C.", rating: 5, comment: "Lugar excelente para levar as crianças. Estrutura impecável." },
        { id: 2, user: "Fernanda L.", rating: 5, comment: "Melhor dourado na brasa da região!" }
    ]
  },
  { 
    id: 6,
    nome: "Pesqueiro MK",
    cidade: "Embu-Guaçu - SP",
    preco: 40, 
    horario: "Sex-Dom: 07:00-17:00",
    aval: 4.8, 
    avalCount: 250, 
    peixes: ["Tambaqui", "Tilápia", "Pintado"], 
    imagemUrl: "/images/foto6.webp", 
    descricao: "Estr. do Charqueado, 755 - Dos Borges. Ótima avaliação dos visitantes.",
    lat: -23.8862565, 
    lng: -46.8357811,
    reviews: [ // <-- NOVO CAMPO
        { id: 1, user: "Silvia M.", rating: 5, comment: "Nota 10 no atendimento! O lugar é muito bem cuidado." }
    ]
  }
];

// Extrai automaticamente as cidades e peixes para os filtros
export const todasCidades = [...new Set(MOCK_PESQUEIROS.map(p => p.cidade))].sort();
export const todosPeixes = [...new Set(MOCK_PESQUEIROS.flatMap(p => p.peixes))].sort();