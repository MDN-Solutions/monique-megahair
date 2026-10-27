/**
 * Conteúdo e dados editáveis do site.
 *
 * Regra: nada aqui é inventado. O que não foi informado pela cliente fica como
 * PENDENTE (campo vazio) ou em uma lista de *placeholders* separada, que só
 * aparece quando `showPlaceholders` é true.
 *
 * Antes de publicar:
 *   1. preencher os campos PENDENTE em `contact`;
 *   2. trocar os placeholders por conteúdo real (ou deixar as listas vazias);
 *   3. colocar `showPlaceholders: false`.
 */

import type { IconName } from '../shared/icon';

export interface ImageRef {
  src: string;
  alt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  tag?: string;
  image?: ImageRef;
}

export interface Differential {
  icon: IconName;
  title: string;
  text: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  detail?: string;
}

export type ResultItem =
  | { kind: 'before-after'; before: ImageRef; after: ImageRef; caption?: string }
  | { kind: 'photo'; image: ImageRef; caption?: string };

export interface OpeningHours {
  days: string;
  time: string;
}

export const SITE = {
  name: 'Studio Monique Marques',
  tagline: 'Especialista em Mega Hair',

  /** true = mostra blocos "A confirmar" para o time ver o que falta. Colocar false para publicar. */
  showPlaceholders: false,

  contact: {
    /** PENDENTE — WhatsApp do estúdio: DDI + DDD + número, só dígitos. Ex.: '5581900000000' */
    whatsapp: '',
    whatsappMessage:
      'Olá! Vim pelo site do Studio Monique Marques e gostaria de agendar um horário.',
    /** PENDENTE — usuário do Instagram, sem @ */
    instagram: '',
    /** PENDENTE — endereço completo, em linhas */
    addressLines: [] as string[],
    /** PENDENTE — URL de incorporação do Google Maps (Compartilhar > Incorporar um mapa > src) */
    mapEmbedUrl: '',
    /** PENDENTE — link "Como chegar" (Google Maps / Waze) */
    mapLink: '',
    /** PENDENTE — horários de atendimento */
    hours: [] as OpeningHours[],
  },

  hero: {
    eyebrow: 'Especialista em Mega Hair',
    lines: ['Seu cabelo.', 'Sua essência.'],
    accentLine: 'Sua melhor versão.',
    subtitle:
      'Mega Hair de alto padrão, acabamento natural e atendimento personalizado para realçar a sua beleza.',
    image: {
      src: 'images/cta-portrait.webp',
      alt: 'Monique de perfil, com cabelo longo, liso e loiro, diante do logotipo dourado do Studio',
    } satisfies ImageRef,
  },

  about: {
    eyebrow: 'O Studio',
    title: 'Beleza natural, com cuidado em cada detalhe.',
    paragraphs: [
      'O Studio Monique Marques é especializado em Mega Hair. O propósito é simples: realçar a sua beleza de forma natural, com acabamento refinado e um atendimento pensado para você.',
      'Cada cliente é única. Por isso, o cuidado começa na atenção ao que você deseja e ao que valoriza o seu estilo. Quando o cabelo está bonito, a autoestima aparece junto.',
    ],
    pillars: ['Beleza natural', 'Autoestima', 'Atendimento personalizado', 'Cuidado com cada cliente'],
    image: {
      src: 'images/about-photo.webp',
      alt: 'Mulher sorrindo, de cabelo longo e loiro, diante do logotipo dourado do Studio Monique Marques na parede',
    } satisfies ImageRef,
    caption: 'Studio Monique Marques',
  },

  services: {
    eyebrow: 'Serviços e especialidades',
    title: 'Mega Hair do jeito que o seu cabelo pede.',
    intro:
      'A especialidade do Studio é o Mega Hair. Fale com a gente para escolher a melhor opção para o seu cabelo e o seu estilo.',
  },

  results: {
    eyebrow: 'Resultados',
    title: 'Resultados reais, em detalhe.',
    intro: 'Fotografias reais do Studio. Arraste e compare o antes e o depois.',
  },

  differentials: {
    eyebrow: 'Diferenciais',
    title: 'Um cuidado que você percebe.',
  },

  testimonials: {
    eyebrow: 'Depoimentos',
    title: 'O que dizem as clientes.',
  },

  finalCta: {
    title: 'Sua próxima transformação começa aqui.',
    text: 'Entre em contato com o Studio Monique Marques e descubra a melhor opção para você.',
    button: 'Falar com o estúdio',
    image: {
      src: 'images/hero-portrait.webp',
      alt: 'Monique sorrindo, com cabelo longo, loiro e ondulado, diante de uma parede de mármore rosa',
    } satisfies ImageRef,
  },

  contactSection: {
    eyebrow: 'Contato',
    title: 'Vamos conversar sobre o seu cabelo.',
  },

  studio: {
    eyebrow: 'O espaço',
    title: 'Por dentro do Studio',
    text: 'Imagens feitas no dia da inauguração.',
  },

  film: {
    src: 'media/film/inauguracao-720.mp4',
    poster: 'media/film/film-poster.webp',
    /** miniatura do card "Assistir à inauguração" (hero) */
    thumb: 'images/studio/neon.webp',
    duration: '1:11',
  },
};

/** Fotos reais do espaço, extraídas do vídeo da inauguração (600 px de largura). */
export interface StudioPhoto extends ImageRef {
  caption: string;
  width: number;
  height: number;
}
export const STUDIO_PHOTOS: StudioPhoto[] = [
  {
    src: 'images/studio/neon.webp',
    alt: 'Letreiro em neon rosa com o monograma M e o nome Studio Monique Marques, sobre parede lilás',
    caption: 'O neon da marca',
    width: 600,
    height: 720,
  },
  {
    src: 'images/studio/lavatorios.webp',
    alt: 'Lavatório de cabelo preto ao lado de um arranjo de flores brancas no salão',
    caption: 'Lavatórios',
    width: 600,
    height: 720,
  },
  {
    src: 'images/studio/espelho.webp',
    alt: 'Espelho com lâmpadas em volta, sobre bancada clara, visto entre folhagens',
    caption: 'Espelho com iluminação',
    width: 600,
    height: 720,
  },
  {
    src: 'images/studio/caixa.webp',
    alt: 'Caixa cor de terracota com o monograma e o nome do Studio Monique Marques em dourado',
    caption: 'A caixa da marca',
    width: 600,
    height: 720,
  },
  {
    src: 'images/studio/sacola.webp',
    alt: 'Sacola rosada com o monograma do Studio Monique Marques e uma corrente dourada pendurada',
    caption: 'A sacola da marca',
    width: 576,
    height: 720,
  },
];

/** Há algum dado de contato real (ou placeholders ligados)? Sem isso a seção Contato não é exibida. */
export const HAS_CONTACT =
  SITE.showPlaceholders ||
  !!(SITE.contact.whatsapp || SITE.contact.instagram || SITE.contact.addressLines.length || SITE.contact.mapEmbedUrl || SITE.contact.hours.length);

// ---------------------------------------------------------------------------
// Conteúdo CONFIRMADO
// ---------------------------------------------------------------------------

/** Serviços confirmados. O logo da marca diz "Especialista em Mega Hair". */
export const SERVICES: Service[] = [
  {
    id: 'mega-hair',
    title: 'Mega Hair',
    tag: 'Especialidade',
    description:
      'Volume e comprimento com acabamento natural, pensados para o seu cabelo e para o seu estilo.',
    image: {
      src: 'images/mega-hair.webp',
      alt: 'Mulher rindo, de cabelo longo e loiro, abraçada a uma cliente no Studio Monique Marques',
    },
  },
];

/** Diferenciais citados no próprio texto do brief ("acabamento natural e atendimento personalizado"). */
export const DIFFERENTIALS: Differential[] = [
  {
    icon: 'sparkle',
    title: 'Atendimento personalizado',
    text: 'Cada cliente é atendida de forma individual, com atenção ao seu estilo e ao resultado que deseja.',
  },
  {
    icon: 'strand',
    title: 'Acabamento natural',
    text: 'Mega Hair com resultado discreto e elegante, que valoriza a sua beleza.',
  },
];

/** Resultados reais (antes/depois ou fotos). VAZIO: nenhuma foto de resultado foi fornecida ainda. */
export const RESULTS: ResultItem[] = [
  {
    kind: 'before-after',
    before: {
      src: 'images/results/antes.webp',
      alt: 'Antes: mulher de cabelo castanho-escuro na altura dos ombros, de blusa canelada laranja, diante de uma parede de rosas',
    },
    after: {
      src: 'images/results/depois.webp',
      alt: 'Depois: a mesma mulher com cabelo preto, liso e longo após o Mega Hair, sorrindo, diante da mesma parede de rosas',
    },
    caption: 'Antes e depois de Mega Hair. Arraste o divisor para comparar.',
  },
];

/** Depoimentos reais ou autorizados. VAZIO: nenhum foi fornecido ainda. */
export const TESTIMONIALS: Testimonial[] = [];

// ---------------------------------------------------------------------------
// PLACEHOLDERS — aparecem só com `showPlaceholders: true`
// ---------------------------------------------------------------------------

export const SERVICE_PLACEHOLDERS: Service[] = [
  {
    id: 'ph-tecnica',
    title: 'Técnica de aplicação',
    tag: 'A confirmar',
    description: 'Cadastrar as técnicas de Mega Hair que o estúdio realmente oferece.',
  },
  {
    id: 'ph-tipos',
    title: 'Tipos de cabelo',
    tag: 'A confirmar',
    description: 'Cadastrar os tipos de cabelo atendidos (liso, ondulado, cacheado etc.).',
  },
  {
    id: 'ph-manutencao',
    title: 'Manutenção e cuidados',
    tag: 'A confirmar',
    description: 'Confirmar se o estúdio faz manutenção e orientação de cuidados.',
  },
];

export const DIFFERENTIAL_PLACEHOLDERS: Differential[] = [
  {
    icon: 'selection',
    title: 'Escolha do cabelo',
    text: 'A confirmar com a profissional: orientação na escolha do cabelo ideal.',
  },
  {
    icon: 'droplet',
    title: 'Orientação de manutenção',
    text: 'A confirmar com a profissional: orientação para manter o resultado.',
  },
];

export const TESTIMONIAL_PLACEHOLDERS: Testimonial[] = [
  {
    quote: 'Depoimento real da cliente, a ser fornecido ou autorizado por ela.',
    name: 'Nome da cliente',
    detail: 'Placeholder',
  },
  {
    quote: 'Depoimento real da cliente, a ser fornecido ou autorizado por ela.',
    name: 'Nome da cliente',
    detail: 'Placeholder',
  },
  {
    quote: 'Depoimento real da cliente, a ser fornecido ou autorizado por ela.',
    name: 'Nome da cliente',
    detail: 'Placeholder',
  },
];
