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

export interface FeaturedService {
  title: string;
  tag: string;
  description: string;
  items: string[];
  image: ImageRef;
  button: string;
}

export interface ServiceGroup {
  id: string;
  title: string;
  items: string[];
  /** texto do botão de agendar do grupo */
  button: string;
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

/** Endereço do Studio em uma linha: usado no mapa e no link "Como chegar". */
const ADDRESS = 'Av. Carlos de Lima Cavalcante, 2413 - Casa Caiada, Olinda - PE, 53130-555';

export const SITE = {
  name: 'Studio Monique Marques',
  tagline: 'Especialista em Mega Hair',

  /** true = mostra blocos "A confirmar" para o time ver o que falta. Colocar false para publicar. */
  showPlaceholders: false,

  contact: {
    /** WhatsApp do estúdio: DDI + DDD + número, só dígitos */
    whatsapp: '5581985466153',
    whatsappMessage:
      'Olá! Vim pelo site do Studio Monique Marques e gostaria de agendar um horário.',
    /** Usuário do Instagram, sem @ */
    instagram: 'studio.moniquemarques',
    /** Endereço completo, em linhas */
    addressLines: ['Av. Carlos de Lima Cavalcante, 2413', 'Casa Caiada, Olinda - PE', 'CEP 53130-555'],
    /** Mapa incorporado do Google Maps, centrado no endereço */
    mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&z=17&output=embed`,
    /** Link "Como chegar" (abre a rota no Google Maps) */
    mapLink: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`,
    /** PENDENTE — horários de atendimento. Vazio = a linha não aparece. */
    hours: [] as OpeningHours[],
  },

  hero: {
    eyebrow: 'Especialista em Mega Hair',
    lines: ['Seu cabelo.', 'Sua essência.'],
    accentLine: 'Sua melhor versão.',
    subtitle:
      'Mega Hair de alto padrão, acabamento natural e atendimento personalizado para realçar a sua beleza.',
    image: {
      src: 'images/hero-strips.webp',
      alt: 'Monique de perfil, com cabelo longo, liso e loiro, diante do logotipo dourado do Studio',
    } satisfies ImageRef,
  },

  founder: {
    eyebrow: 'Quem é Monique',
    title: 'Monique Marques',
    role: 'Especialista em Mega Hair, fundadora e Diretora Criativa do Studio Monique Marques.',
    paragraphs: [
      'Antes de seguir o sonho de se tornar megahista, passou por diferentes áreas: foi colaboradora, estagiária comercial, vendedora, assistente administrativa e analista financeira em uma multinacional.',
      'Hoje, à frente de uma unidade especializada em alongamento capilar, atende uma ampla gama de clientes, incluindo influenciadores. A marca Monique Marques já se expandiu para outros estados e países, onde vende suas extensões de luxo.',
      'No Studio, Monique faz muito mais do que Mega Hair: ela também realiza outros serviços de cabelo, sempre com o mesmo cuidado e a mesma atenção a cada cliente.',
    ],
    image: {
      src: 'images/monique-historia.webp',
      alt: 'Monique Marques sorrindo, sentada em uma cadeira suspensa, com cabelo longo e loiro, blazer risca de giz e botas claras',
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
      'A especialidade do Studio é o Mega Hair, mas o cuidado vai além: Monique também realiza outros serviços de beleza. Fale com a gente para escolher a melhor opção para o seu cabelo e o seu estilo.',
    moreTitle: 'Também no Studio',
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
    text: 'Chame no WhatsApp para tirar dúvidas e agendar o seu horário.',
    button: 'Agendar pelo WhatsApp',
    instagramButton: 'Ver o Instagram',
    directions: 'Como chegar',
  },

  studio: {
    eyebrow: 'O espaço',
    title: 'Por dentro do Studio',
    text: 'Conheça o novo espaço do Studio.',
  },

  film: {
    src: 'media/film/inauguracao-720.mp4',
    poster: 'media/film/film-poster.webp',
    /** não exibido no momento (botão "Assistir à inauguração" removido a pedido) */
    thumb: 'images/studio/neon.webp',
    duration: '1:11',
  },
};

/** Fotos reais do novo espaço (720 × 960 px, retrato 3:4). */
export interface StudioPhoto extends ImageRef {
  caption: string;
  width: number;
  height: number;
}
export const STUDIO_PHOTOS: StudioPhoto[] = [
  {
    src: 'images/studio/salao.webp',
    alt: 'Salão do Studio com três cadeiras pretas, bancadas com espelhos e plantas pendentes, TV na parede e balcão branco de recepção',
    caption: 'O salão',
    width: 720,
    height: 960,
  },
  {
    src: 'images/studio/espelho-oval.webp',
    alt: 'Espelho oval com iluminação dourada ao lado de um móvel branco com produtos, cafeteira e plantas, sob a escada de madeira',
    caption: 'Espelho com iluminação',
    width: 720,
    height: 960,
  },
  {
    src: 'images/studio/lavatorios-duplos.webp',
    alt: 'Dois lavatórios brancos com poltronas marrons acolchoadas, encostados em uma parede bege',
    caption: 'Lavatórios',
    width: 720,
    height: 960,
  },
  {
    src: 'images/studio/caixa-presente.webp',
    alt: 'Caixa do Studio Monique Marques com a foto da Monique e laço dourado, ao lado de uma pequena árvore de Natal dourada',
    caption: 'A caixa da marca',
    width: 720,
    height: 960,
  },
];

/** Há algum dado de contato real (ou placeholders ligados)? Sem isso a seção Contato não é exibida. */
export const HAS_CONTACT =
  SITE.showPlaceholders ||
  !!(SITE.contact.whatsapp || SITE.contact.instagram || SITE.contact.addressLines.length || SITE.contact.mapEmbedUrl || SITE.contact.hours.length);

// ---------------------------------------------------------------------------
// Conteúdo CONFIRMADO
// ---------------------------------------------------------------------------

/** Serviço principal, em destaque (mesma foto do card original). */
export const FEATURED_SERVICE: FeaturedService = {
  title: 'Mega Hair',
  tag: 'Especialidade do Studio',
  description: 'Volume e comprimento com acabamento natural, pensados para o seu cabelo e para o seu estilo.',
  items: ['Aplicação de mega hair', 'Manutenção', 'Remoção', 'Venda de cabelo'],
  image: {
    src: 'images/mega-hair-dupla.webp',
    alt: 'Mulher de cabelo longo e loiro, em vestido dourado, posando ao lado de um rapaz no salão do Studio Monique Marques, junto a uma árvore de Natal',
  },
  button: 'Agendar Mega Hair',
};

/** Demais serviços de beleza do Studio, por categoria (lista passada pelo cliente/Marco). */
export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    id: 'cabelos',
    title: 'Cabelos',
    button: 'Agendar serviço de cabelo',
    items: [
      'Corte',
      'Escova',
      'Coloração',
      'Mechas',
      'Luzes',
      'Cronograma capilar',
      'Hidratação',
      'Nutrição',
      'Reconstrução',
      'Cauterização',
      'Progressiva',
      'Alisamento',
      'Penteados',
    ],
  },
  {
    id: 'sobrancelhas',
    title: 'Sobrancelhas',
    button: 'Agendar sobrancelha',
    items: ['Design de sobrancelha', 'Limpeza de sobrancelha', 'Pinça', 'Henna'],
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

/** Resultados reais (antes/depois ou fotos) do Studio. */
export const RESULTS: ResultItem[] = [
  {
    kind: 'before-after',
    before: {
      src: 'images/results/ale-antes.webp',
      alt: 'Antes: mulher sorrindo, de cabelo preto e liso abaixo dos ombros, top caramelo e saia bege, diante de uma parede de rosas',
    },
    after: {
      src: 'images/results/ale-depois.webp',
      alt: 'Depois: a mesma mulher com cabelo preto e liso até a altura do quadril após o Mega Hair, diante da mesma parede de rosas',
    },
    caption: 'Mega Hair liso: comprimento até o quadril, com volume e brilho.',
  },
  {
    kind: 'before-after',
    before: {
      src: 'images/results/camila-antes.webp',
      alt: 'Antes: mulher de cabelo castanho ondulado com mechas, na altura do peito, body de renda preta, diante de uma parede de rosas',
    },
    after: {
      src: 'images/results/camila-depois.webp',
      alt: 'Depois: a mesma mulher com cabelo ondulado longo e iluminado em tons de mel após o Mega Hair, diante da mesma parede de rosas',
    },
    caption: 'Mega Hair ondulado: mais comprimento, volume e iluminação.',
  },
  {
    kind: 'before-after',
    before: {
      src: 'images/results/julia-antes.webp',
      alt: 'Antes: jovem sorrindo, de cabelo preto e liso na altura dos ombros, top azul-claro, diante do letreiro neon do Studio Monique Marques',
    },
    after: {
      src: 'images/results/julia-depois.webp',
      alt: 'Depois: a mesma jovem com cabelo preto, liso e longo após o Mega Hair, diante do letreiro neon do Studio Monique Marques',
    },
    caption: 'Do curto ao longo: Mega Hair liso com acabamento natural.',
  },
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
    caption: 'Mega Hair liso: mais comprimento e cor uniforme.',
  },
];

/** Depoimentos reais ou autorizados. VAZIO: nenhum foi fornecido ainda. */
export const TESTIMONIALS: Testimonial[] = [];

// ---------------------------------------------------------------------------
// PLACEHOLDERS — aparecem só com `showPlaceholders: true`
// ---------------------------------------------------------------------------

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
