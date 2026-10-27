# Studio Monique Marques — Especificação de design

> **Status do Figma:** o MCP do Figma não estava conectado na sessão de criação (aparece como "não instalado" no registro de conectores), então **não foi possível criar o arquivo no Figma**. Seguindo o plano alternativo do brief, esta spec traz tokens, componentes, storyboard da abertura e layouts por breakpoint, e a implementação em Angular segue exatamente o que está aqui. Para levar ao Figma depois: conectar o MCP do Figma e usar este documento + `src/styles/_tokens.scss` como fonte (cada token abaixo tem nome de variável CSS).

## 1. Conceito

Luxo silencioso: marfim e branco como "papel", dourado só como acabamento (fios, ícones, detalhes de botão), tipografia editorial de alto contraste e muito espaço em branco. A marca já tem monograma **M** dourado em círculo; ele é o elemento-assinatura (abertura, header, favicon, rodapé).

Ideia visual recorrente: **arco** (referência à moldura do monograma e a portas de boutique). Fotos principais ficam em molduras em arco com um segundo arco em fio dourado deslocado atrás. Cantos retos em todo o resto (sem excesso de cards arredondados).

Fonte das imagens: **todas reais**, extraídas do vídeo da inauguração enviado pela cliente. Nada gerado por IA.

## 2. Tokens

### Cores (`--c-*`)

| Token | Hex | Uso | Contraste |
|---|---|---|---|
| `--c-white` | `#FFFFFF` | superfícies de destaque | — |
| `--c-ivory` | `#FAF8F3` | fundo base | — |
| `--c-champagne` | `#E8D4B0` | fios, fundos suaves, hover | — |
| `--c-gold` | `#C6A66B` | **só decorativo**: fios, ícones, bordas, botão primário | 2,18:1 sobre marfim (não usar para texto) |
| `--c-gold-light` | `#E4CD9B` | brilho, hover do botão | — |
| `--c-gold-text` | `#7A5A22` | texto dourado pequeno (eyebrows, links) | 5,97:1 sobre marfim (AA) |
| `--c-ink` | `#24211D` | texto principal, rodapé | 15,1:1 |
| `--c-muted` | `#77736D` | cor do brief, só para texto grande/decorativo | 4,44:1 (abaixo de AA para corpo) |
| `--c-text-muted` | `#6A665F` | **variante acessível** do cinza para texto corrido | 5,38:1 (AA) |
| `--c-blush` | `#F2E6DF` | toque de rosé vindo da decoração real do estúdio, usado só em placeholders e fundos de apoio | — |

Botão primário: fundo `--c-gold`, texto `--c-ink` (6,92:1, AA).

### Tipografia

- **Display:** Bodoni Moda (variável; eixo óptico fixado em `opsz` 22 nos títulos/itálicos e 11 em textos pequenos, porque no automático os fios ficam finos demais em telas 1x), peso 400, italic para ênfase. Combina com o wordmark da marca (didone). Auto-hospedada, só subset latin.
- **Texto/UI:** Jost (variável 300–600), geométrica como a linha "ESPECIALISTA EM MEGA HAIR" da logo.

| Estilo | Tamanho (fluido) | Linha | Extras |
|---|---|---|---|
| `display` (hero H1) | `clamp(2.75rem, 1.5rem + 5.6vw, 6.25rem)` | 1.02 | tracking −0.015em |
| `h2` | `clamp(2.1rem, 1.3rem + 2.8vw, 3.9rem)` | 1.08 | |
| `h3` | `clamp(1.5rem, 1.2rem + 0.9vw, 2rem)` | 1.2 | |
| `lead` | `clamp(1.0625rem, 1rem + 0.35vw, 1.3rem)` | 1.65 | Jost 300–400 |
| `body` | 1.0625rem | 1.7 | Jost 400 |
| `small` | 0.875rem | 1.55 | |
| `eyebrow` | 0.75rem | 1.4 | Jost 500, caixa alta, tracking 0.28em, `--c-gold-text` |

### Espaço, forma, sombra, linhas

- Escala (`--s-*`): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px. Respiro vertical entre seções: `clamp(5rem, 9vw, 9.5rem)`.
- Container: 1240 px máx.; gutter `clamp(1.25rem, 4vw, 3rem)`.
- Raio: 0 em tudo; **arco** (`border-radius: 999px 999px 0 0`) para fotos principais.
- Sombra única e leve: `0 30px 60px -36px rgba(36,33,29,.35)`. Sem neon, sem sombras pesadas.
- Fio: `1px solid rgba(198,166,107,.55)` (`--line-gold`) e `1px solid rgba(36,33,29,.12)` (`--line`).
- Ornamento: losango de 6 px em dourado, usado como separador (CSS, não emoji).

### Movimento

- Easing padrão `cubic-bezier(.22,.61,.36,1)`; easing de "porta/iris" `cubic-bezier(.65,0,.25,1)`.
- Entrada de seção: opacidade 0→1 + `translateY(28px→0)`, 900 ms, stagger 90–120 ms. Disparada por `IntersectionObserver` (uma vez).
- Hover de botão: preenchimento sobe em 350 ms; sem escala exagerada.
- `prefers-reduced-motion`: sem abertura, sem parallax, transições reduzidas a fade de 150 ms.

## 3. Grid e breakpoints

| Nome | Largura | Grid |
|---|---|---|
| mobile | < 640 | 4 colunas, gutter 20 |
| tablet | 640–1023 | 8 colunas |
| desktop | ≥ 1024 | 12 colunas, container 1240 |

## 4. Componentes

- **Botão primário** (`.btn--primary`): retângulo, fundo ouro, texto marfim-escuro, caixa alta 0.8125rem tracking .16em, altura 52 px (alvo de toque ≥ 48), seta fina à direita. Hover: fundo `--c-gold-light`, seta desloca 4 px. Foco: contorno 2 px `--c-ink` com offset 3 px.
- **Botão secundário** (`.btn--ghost`): só texto + sublinhado dourado de 1 px que cresce no hover.
- **Botão do header** (`.btn--outline`): fio dourado 1 px, texto `--c-ink`, preenche em champagne no hover.
- **Eyebrow + título de seção** (`SectionHeading`): eyebrow dourado, fio curto de 48 px, H2 Bodoni.
- **Moldura em arco** (`.arch`): foto com topo em arco e arco de fio dourado deslocado 18 px atrás; legenda opcional.
- **Card de serviço**: imagem 4:5, título Bodoni, descrição curta, link "Agendar este serviço" (WhatsApp com mensagem pré-preenchida). Estado placeholder: borda tracejada dourada, fundo `--c-blush`, monograma em marca d'água, selo "A confirmar".
- **Comparador antes/depois**: duas imagens sobrepostas, divisor vertical dourado com alça; arrasto por ponteiro e teclado (setas), `role="slider"`.
- **Depoimento**: aspas tipográficas douradas (Bodoni), texto em italic, nome em caixa alta pequena.
- **Ícones**: traço 1.25 px, 32 px, dourado, sem preenchimento; SVG inline.
- **Header**: 84 px no topo (transparente); ao rolar, marfim 86% + `backdrop-filter: blur(14px)` + sombra de 1 px. Mobile: botão de menu abre painel em tela cheia com links em Bodoni.
- **Barra WhatsApp (mobile)**: botão fixo na base após passar da hero.

## 5. Abertura cinematográfica

### Decisão técnica

O vídeo da inauguração enviado pela cliente contém **o corte real da fita** (plano aberto 0:12–0:14 e close-up das tesouras diante da parede da marca em 0:16–0:18, corte em ≈0:16,8). Com um asset real, do próprio estúdio, o vídeo é mais convincente que qualquer fita 3D simulada.

| Opção | Realismo | Peso | Risco | Decisão |
|---|---|---|---|---|
| Vídeo real editado (2,4 MB / 0,43 MB webm) | máximo, é o evento real | baixo | fita é **vermelha** no vídeo, não dourada | **escolhida** |
| Three.js (fita + tesoura 3D) | alto, mas é simulação | +300–600 KB de JS | muito tempo de acerto físico | descartada |
| CSS | baixo | mínimo | o brief proíbe | descartada |

GSAP e Three.js **não foram adicionados**: a sequência tem poucos marcos e é conduzida por `currentTime` do vídeo + classes CSS.

### Edição do clipe (ffmpeg, 4,4 s, sem áudio)

1. Plano aberto 12,45–14,30 s (ela se aproxima da fita).
2. Corte por continuidade para o close-up 16,43–18,05 s em **câmera lenta 0,6×** (interpolação de movimento), mostrando o corte.
3. Grade leve: saturação −10%, contraste +3%, realce quente.

### Storyboard

| Tempo | Cena | O que acontece |
|---|---|---|
| 0,0–1,6 s | 1. Abertura | Fundo marfim com vinheta suave. O monograma dourado surge (fade + varredura de brilho de 900 ms). Em seguida, "STUDIO MONIQUE MARQUES" com tracking .42em. O vídeo pré-carrega por baixo. |
| 1,6–2,9 s | 2. Iris | Um anel dourado de 1 px abre do centro (1,3 s) e revela o vídeo por dentro; o monograma some. O vídeo começa: plano aberto, ela diante da fita. |
| clip 1,85 s | corte | Match cut para o close-up em câmera lenta. |
| clip ≈2,42 s | 3. O corte | Instante exato em que a fita se parte: **brilho dourado** (radial champagne, 700 ms, `mix-blend-mode: screen`). As pontas reagem no próprio vídeo. |
| clip 3,5 s | 4. Revelação | O vídeo dissolve para marfim (fadewhite 700 ms) e o overlay se desfaz. O logotipo do header entra (fade + tracking de .3em → .12em), as linhas do H1 sobem em máscara com stagger de 120 ms e a foto em arco se revela de baixo para cima (clip-path 1,2 s). Botões por último. |

Duração total ≈ 5,9 s. O botão **Pular abertura** existe desde o primeiro quadro; `Esc` também pula.

### Regras de robustez

- Roda uma vez por sessão (`sessionStorage`). `?abertura` na URL força rever.
- Não roda com `prefers-reduced-motion`, `saveData` ou conexão 2G; nesses casos só aparece o conteúdo.
- Falha de vídeo (erro, `play()` rejeitado, sem codec, 6 s sem iniciar): a abertura encerra sozinha e o site aparece.
- Enquanto toca, o conteúdo fica `inert` e o scroll travado; ao terminar, o foco vai para o conteúdo.
- Mobile: usa o arquivo 720p; vídeo preenche a tela com recorte central (`object-position` ajustado por cena).

## 6. Seções (resumo de layout)

**Hero** — desktop: 2 colunas assimétricas (texto 6/12, foto em arco 5/12 com sangria à direita). Mobile: texto primeiro (H1, subtítulo, CTAs visíveis na primeira tela), foto em arco abaixo.

```
┌──────────────────────────────────────────────┐
│ [M] STUDIO MONIQUE MARQUES   Início Sobre … [Agendar] │
│                                              │
│  ── ESPECIALISTA EM MEGA HAIR        ╭────╮  │
│  Seu cabelo.                         │    │  │
│  Sua essência.                       │foto│  │
│  *Sua melhor versão.*                │arco│  │
│  Mega Hair de alto padrão…           ╰────╯  │
│  [Agendar pelo WhatsApp]  Conhecer o estúdio │
└──────────────────────────────────────────────┘
```

**Sobre** — foto larga 16:9 da parede da marca (legenda "Inauguração do Studio" + botão "Assistir à inauguração" que abre o filme em `<dialog>`), texto e três pilares abaixo/ao lado.

**Serviços** — grade de 3 colunas (2 no tablet, 1 com scroll-snap no mobile). Um serviço confirmado (Mega Hair); demais são placeholders configuráveis.

**Resultados** — comparador antes/depois + grade de fotos. Sem fotos reais fornecidas: aparece placeholder identificado (ou a seção some quando `showPlaceholders = false`).

**Diferenciais** — 4 colunas com ícone de fio dourado; separadores verticais em fio.

**Depoimentos** — três colunas (carrossel com scroll-snap no mobile), aspas em Bodoni.

**CTA final** — fundo marfim, foto em arco à esquerda, mensagem e botão à direita.

**Contato e rodapé** — lista (WhatsApp, Instagram, endereço, horários) + mapa; rodapé escuro `--c-ink` com lockup dourado, navegação e direitos.

## 7. Acessibilidade e performance

- Contraste AA em todos os textos (ver tabela de cores). Dourado `#C6A66B` nunca é cor de texto.
- Navegação por teclado completa, foco visível, `skip link`, landmarks (`header`, `main`, `footer`, `nav`).
- Imagens com `alt` descritivo; decorativas com `alt=""`. `loading="lazy"` e `decoding="async"` abaixo da dobra; imagem da hero com `fetchpriority="high"`.
- Fontes self-hosted (3 arquivos woff2, ≈125 KB), `font-display: swap`, preload das duas usadas na primeira dobra.
- Sem dependências de runtime além do Angular.

## 8. Inventário de assets (todos reais)

| Arquivo | Origem | Uso |
|---|---|---|
| `media/opening/*` | vídeo da inauguração, 12,45–14,30 s + 16,43–18,05 s | abertura |
| `media/film/inauguracao-720.mp4` | vídeo da inauguração completo (71 s), 720p | modal "Assistir à inauguração" |
| `images/hero-portrait.webp` | frame 37,25 s | hero |
| `images/about-wide.webp` | frame 36,90 s | Sobre |
| `images/cta-portrait.webp` | frame 14,65 s (logo parcial da parede removido) | CTA final |
| `images/mega-hair.webp` | frame 22,0 s (recorte) | card Mega Hair |
| `brand/*.svg` | PDF da logo (versão dourada), vetorizado | header, abertura, rodapé, favicon |

Os frames passam por uma correção de cor que dessatura o roxo/magenta da parede para conversar com a paleta marfim e dourada (cabelo e pele não são alterados).
