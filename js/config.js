/* ==========================================================
   CONFIGURAÇÃO DO SITE — edite apenas este arquivo.
   Tudo que estiver vazio ("" ou []) simplesmente não aparece
   ou usa um comportamento seguro (nada é inventado).
   ========================================================== */
window.STUDIO_CONFIG = {
  nome: "Studio Monique Marques",

  // Instagram oficial (sem @)
  instagram: "studio.moniquemarques",

  // WhatsApp oficial: só dígitos, com DDI + DDD. Ex.: "5581999999999"
  // Enquanto estiver vazio, os botões de WhatsApp abrem o Direct do Instagram.
  whatsapp: "",

  mensagemWhatsapp:
    "Olá! Conheci o Studio Monique Marques pelo site e gostaria de saber mais sobre o mega hair e agendar uma avaliação.",

  // Preencha somente com dados confirmados pela profissional
  endereco: "", // ex.: "Rua X, 123 — Bairro, Cidade/PE"
  horario: "",  // ex.: "Seg a Sáb · 9h às 18h"

  /* ---------- Fotos ----------
     Coloque os arquivos na pasta /images com estes nomes.
     Se um arquivo não existir, aparece uma moldura elegante
     indicando qual foto falta. */
  imagens: {
    hero:    { src: "images/hero.jpg",    alt: "Cabelo longo e volumoso com mega hair feito no Studio Monique Marques" },
    studio:  { src: "images/monique.jpg", alt: "Monique Marques, especialista em mega hair" },
    detalhe: { src: "images/detalhe.jpg", alt: "Detalhe de acabamento natural do mega hair" },
    cta:     { src: "images/cta.jpg",     alt: "Resultado de mega hair com brilho e movimento" }
  },

  // Galeria editorial (6 a 8 fotos ficam melhor). Ordem = ordem na tela.
  galeria: [
    { src: "images/galeria-01.jpg", alt: "Mega hair loiro com ondas e raiz esfumada" },
    { src: "images/galeria-02.jpg", alt: "Mega hair loiro longo com ondas, visto de costas" }
  ],

  // Somente pares REAIS da mesma cliente. Ex.:
  // { antes: "images/antes-01.jpg", depois: "images/depois-01.jpg", alt: "Antes e depois — cliente 1" }
  antesDepois: [],

  // Somente depoimentos reais e autorizados. Ex.:
  // { texto: "...", nome: "Primeiro nome" }
  depoimentos: []
};
