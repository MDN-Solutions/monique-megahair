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

export interface ImageRef {
  src: string;
  alt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image?: ImageRef;
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

export interface StudioPhoto extends ImageRef {
  caption: string;
}

export const SITE = {
  name: 'Studio Monique Marques',
  tagline: 'Especialista em Mega Hair',

  /** true = mostra o que ainda falta confirmar (tags tracejadas, blocos "A confirmar"). Colocar false para publicar. */
  showPlaceholders: true,

  contact: {
    /** PENDENTE — WhatsApp do estúdio: DDI + DDD + número, só dígitos. Ex.: '5581900000000' */
    whatsapp: '',
    whatsappMessage: 'Oi! Vi o site do Studio Monique Marques e queria marcar um horário.',
    /** PENDENTE — usuário do Instagram, sem @ */
    instagram: '',
    /** PENDENTE — bairro e cidade, para a etiqueta da hero. Ex.: 'Boa Viagem, Recife' */
    city: '',
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
    /** Linha da própria logo. A última parte ganha o traço à mão. */
    title: 'Especialista em',
    highlight: 'Mega Hair',
    subtitle: 'Mega Hair de alto padrão, com acabamento natural e atendimento personalizado.',
    /** Recorte sem fundo (PNG com transparência em webp): a foto fica por cima do nome gigante. */
    image: {
      src: 'images/hero-cutout.webp',
      alt: 'Mulher sorrindo, com cabelo longo, loiro e ondulado caindo sobre os ombros',
    } satisfies ImageRef,
  },

  about: {
    /** Trecho em negrito no começo do título */
    titleStrong: 'Studio Monique Marques:',
    title: 'Mega Hair para realçar a sua beleza natural.',
    paragraphs: [
      'O Studio é especializado em Mega Hair. Cada atendimento busca um resultado natural, que combine com o seu cabelo e com o seu estilo.',
      'Antes de começar, a conversa é sobre o que você quer: comprimento, volume e o visual que faz você se sentir bem.',
    ],
    image: {
      src: 'images/about-wide.webp',
      alt: 'Mulher de cabelo longo e loiro sorrindo no Studio Monique Marques, com o monograma da marca na parede ao fundo',
    } satisfies ImageRef,
  },

  services: {
    title: 'Mega Hair',
    cardTitle: 'No atendimento',
    othersTitle: 'Outros serviços',
  },

  studio: {
    title: 'Por dentro do Studio',
    text: 'Imagens feitas no dia da inauguração.',
  },

  results: {
    title: 'Antes e depois',
    intro: 'Só entram fotos reais de clientes, publicadas com autorização.',
  },

  testimonials: {
    title: 'Clientes',
  },

  finalCta: {
    title: 'Vamos marcar o seu',
    highlight: 'horário?',
    text: 'Mande uma mensagem pelo WhatsApp contando o que você quer para o seu cabelo.',
    button: 'Chamar no WhatsApp',
    image: {
      src: 'images/studio/sacola.webp',
      alt: 'Sacola rosada com o monograma do Studio Monique Marques e uma corrente dourada pendurada',
    } satisfies ImageRef,
  },

  contactSection: {
    title: 'Contato',
  },

  film: {
    src: 'media/film/inauguracao-720.mp4',
    poster: 'media/film/film-poster.webp',
    /** miniatura do card "Assistir à inauguração" */
    thumb: 'images/studio/neon.webp',
    duration: '1:11',
  },
};

// ---------------------------------------------------------------------------
// Conteúdo CONFIRMADO
// ---------------------------------------------------------------------------

/** Serviços confirmados. O logo da marca diz "Especialista em Mega Hair". O primeiro é o destaque da seção. */
export const SERVICES: Service[] = [
  {
    id: 'mega-hair',
    title: 'Mega Hair',
    description: 'Volume e comprimento com acabamento natural, pensados para o seu cabelo e para o seu estilo.',
    image: {
      src: 'images/mega-hair.webp',
      alt: 'Mulher rindo, de cabelo longo e loiro, abraçada a uma cliente no Studio Monique Marques',
    },
  },
];

/** Diferenciais citados no próprio texto do brief ("acabamento natural e atendimento personalizado"). */
export const DIFFERENTIALS: string[] = ['Atendimento personalizado', 'Acabamento natural'];

/** Fotos reais do espaço, tiradas do vídeo da inauguração (public/media/film). */
export const STUDIO_PHOTOS: StudioPhoto[] = [
  {
    src: 'images/studio/neon.webp',
    alt: 'Letreiro em neon rosa com o monograma M e o nome Studio Monique Marques, sobre parede lilás',
    caption: 'O neon da marca',
  },
  {
    src: 'images/studio/lavatorios.webp',
    alt: 'Lavatório de cabelo preto ao lado de um arranjo de flores brancas no salão',
    caption: 'Lavatórios',
  },
  {
    src: 'images/studio/espelho.webp',
    alt: 'Espelho com lâmpadas em volta, sobre bancada clara, visto entre folhagens',
    caption: 'Espelho com iluminação',
  },
  {
    src: 'images/studio/caixa.webp',
    alt: 'Caixa cor de terracota com o monograma e o nome do Studio Monique Marques em dourado',
    caption: 'A caixa da marca',
  },
];

/** Resultados reais (antes/depois ou fotos). VAZIO: nenhuma foto de resultado foi fornecida ainda. */
export const RESULTS: ResultItem[] = [];

/** Depoimentos reais ou autorizados. VAZIO: nenhum foi fornecido ainda. */
export const TESTIMONIALS: Testimonial[] = [];

// ---------------------------------------------------------------------------
// PLACEHOLDERS — aparecem só com `showPlaceholders: true`
// ---------------------------------------------------------------------------

/** Outros serviços que talvez existam: confirmar com a cliente antes de virar SERVICES. */
export const SERVICE_PLACEHOLDERS: string[] = ['Técnicas de aplicação', 'Tipos de cabelo atendidos', 'Manutenção'];

/** Diferenciais prováveis, ainda sem confirmação da profissional. */
export const DIFFERENTIAL_PLACEHOLDERS: string[] = ['Escolha do cabelo', 'Orientação de manutenção'];
