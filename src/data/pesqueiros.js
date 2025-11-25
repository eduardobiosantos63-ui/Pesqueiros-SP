// src/data/pesqueiros.js
// VERSÃO FINAL: Usando caminhos relativos (./) para corrigir o 404 no Vercel.

export const MOCK_PESQUEIROS = [
  {
    id: 1,
    nome: "Pesqueiro Sakura",
    cidade: "Embu-Guaçu - SP",
    preco: 25, 
    horario: "Qua-Dom: 07:00-18:00", 
    aval: 4.6, 
    avalCount: 2020, 
    peixes: ["Tambaqui", "Patinga", "Tilápia", "Carpa", "Cachapira"],
    iscas_sugeridas: ["Anteninha", "Massa Branca", "Salsicha", "Ração", "Mafish (Coco)", "Manhoso"],
    galeria: [ 
      "./foto1.webp", // <-- CAMINHO FINAL CORRIGIDO
      "./foto2.webp",
      "./foto3.webp"
    ],
    descricao: "O Pesqueiro Sakura é um espaço amplo, bem cuidado e ideal para lazer e pesca. Oferece dois grandes lagos (esportivo e tilápias), playground, quiosques e restaurante completo. A entrada de R$25 refere-se à pesca de tilápias, e R$30 para o lago esportivo. Local com ótimo custo-benefício.", 
    lat: -23.8376408, 
    lng: -46.7876175, 
    reviews: [ { id: 1, user: "Mariana Souza", rating: 5, comment: "Lugar lindo e muito organizado." }]
  },
  {
    id: 2,
    nome: "Pesqueiro do Galego",
    cidade: "Embu-Guaçu - SP",
    preco: 40, 
    horario: "Todos os dias: 07:00-17:00", 
    aval: 4.4, 
    avalCount: 1143, 
    peixes: ["Tilápia", "Pacu", "Tambaqui", "Pintado"],
    iscas_sugeridas: ["Anteninha", "Milho Cozido", "Ração Furadinha", "Salsicha"], 
    galeria: ["./foto4.webp"], // <-- CAMINHO FINAL CORRIGIDO
    descricao: "Av. Ernesto João Marcelino, 2177. Natureza abundante, parquinho para crianças e ótimo restaurante.",
    lat: -23.8143426, 
    lng: -46.8015003,
    reviews: [ { id: 1, user: "Rafael Costa", rating: 5, comment: "O Tambaqui aqui é gigantesco!" }]
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
    iscas_sugeridas: ["Anteninha", "Massa Japonesa", "Goiabada", "Pão"], 
    galeria: ["./foto5.webp"], // <-- CAMINHO FINAL CORRIGIDO
    descricao: "R. Tia Zulmira, 200. Conhecido pelo ambiente tranquilo e boa pescaria esportiva.",
    lat: -23.8428039, 
    lng: -46.7896118,
    reviews: [ { id: 1, user: "João Carlos", rating: 4, comment: "Voltei a semana passada, peguei 3 traíras grandes! Recomendo." }]
  },
  { 
    id: 4,
    nome: "Pesqueiro Matsumura",
    cidade: "São Paulo - SP",
    preco: 70, 
    horario: "Todos os dias: 07:00-18:00", 
    aval: 4.3, 
    avalCount: 800, 
    peixes: ["Carpa Cabeçuda", "Pintado", "Tambaqui"],
    iscas_sugeridas: ["Massa de Fundo", "Ração com Essência", "Pão na Pinga"],
    galeria: ["./foto6.webp"], // <-- CAMINHO FINAL CORRIGIDO
    descricao: "R. Yoshio Matsumura, 452. Um dos pesqueiros mais tradicionais de São Paulo.",
    lat: -23.8252091, 
    lng: -46.6723802,
    reviews: [ { id: 1, user: "Marcio L.", rating: 4, comment: "Excelente, mas fica cheio nos finais de semana." }]
  },
  { 
    id: 5,
    nome: "Estância P. Campos",
    cidade: "Juquitiba - SP",
    preco: 60, 
    horario: "Todos os dias: 07:00-18:00", 
    aval: 4.4, 
    avalCount: 650, 
    peixes: ["Pacu", "Tambaqui", "Dourado"],
    iscas_sugeridas: ["Anteninha", "Ração na Pinga", "Salsicha Flutuante"],
    galeria: ["./foto7.webp"], // <-- CAMINHO FINAL CORRIGIDO
    descricao: "Estr. do Enxadão, 800. Pesqueiro de alto padrão para pesca esportiva e lazer.",
    lat: -23.8817373, 
    lng: -47.0063387,
    reviews: [ { id: 1, user: "Julia F.", rating: 5, comment: "Melhor estrutura que já vi! Vale o preço da entrada." }]
  },
  { 
    id: 6,
    nome: "N. Sra. de Fátima",
    cidade: "Embu-Guaçu - SP",
    preco: 25, 
    horario: "Todos os dias: 07:00-17:30", 
    aval: 4.3, 
    avalCount: 150, 
    peixes: ["Tilápia", "Pacu", "Carpa", "Tambacu"],
    iscas_sugeridas: ["Anteninha", "Goiabada", "Salsicha", "Tripa de Frango"],
    galeria: ["./foto8.webp"], // <-- CAMINHO FINAL CORRIGIDO
    descricao: "Estr. Luiz Mentone, 868. Um pesqueiro tradicional na região, ideal para quem busca um dia de paz e pesca.",
    lat: -23.8606095, 
    lng: -46.7792521,
    reviews: [ { id: 1, user: "Luiz Carlos", rating: 4, comment: "Sempre bom para a família. Preço justo." }]
  }
];

// Extrai automaticamente as cidades e peixes para os filtros
export const todasCidades = [...new Set(MOCK_PESQUEIROS.map(p => p.cidade))].sort();
export const todosPeixes = [...new Set(MOCK_PESQUEIROS.flatMap(p => p.peixes))].sort();