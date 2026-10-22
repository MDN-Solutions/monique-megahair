# Studio Monique Marques — Especificação de design

> Versão 2. A primeira versão (marfim + dourado, arcos, títulos com "eyebrow" dourado em todas as seções) ficou com cara de template gerado. Esta versão parte de duas referências enviadas pela cliente/equipe (o site **SHEAR** e o case **GESTWŁOSY**) e, principalmente, do material real do Studio.

## 1. Conceito

**Editorial, quente e com o Studio de verdade na tela.** Em vez de uma paleta genérica de "luxo", as cores, as fotos e os detalhes saem do vídeo da inauguração: a parede lilás, o neon rosa, a sacola e a caixa da marca em pêssego e terracota, o letreiro da fachada em magenta.

O que mudou em relação à v1 (e por quê):

| v1 | v2 | Motivo |
|---|---|---|
| Rótulo dourado em caixa alta + fio antes de todo título | Sem rótulos; o título carrega a seção | O padrão "eyebrow + H2 + parágrafo + grade" repetido 7 vezes era o que mais denunciava o template |
| Dourado como cor de interface | Dourado só no monograma (é a cor da logo) | Botões e ícones dourados sobre marfim são o clichê de "salão premium" |
| Bodoni Moda em itálico dourado nas últimas palavras | Newsreader (serifa de leitura, tamanho óptico de display) + Jost fino | Referências: serifa calma do GESTWŁOSY e títulos finos com trecho em negrito do SHEAR |
| Fotos em arco com fio dourado deslocado | Fotos com canto reto, sangrando até a borda da tela | Referência SHEAR |
| Cards com monograma em marca d'água para conteúdo que falta | Tags tracejadas e avisos curtos de "Placeholder" | Os cards vazios ocupavam metade da página |
| Abertura com íris dourada, brilho e varredura | Marca → vídeo real em fade → creme | O corte real da fita já é a cena; os efeitos competiam com ele |
| Frases de efeito ("Seu cabelo. Sua essência. Sua melhor versão.") | Textos diretos, a linha da própria logo como título | Tríades e frases de impacto soam escritas por IA |

## 2. Tokens (`src/styles/_tokens.scss`)

### Cores

| Token | Hex | Origem / uso | Contraste |
|---|---|---|---|
| `--c-paper` | `#F6F0EA` | creme rosado, fundo base | — |
| `--c-white` | `#FFFDFB` | faixa de serviços, contato, cards | — |
| `--c-sand` | `#DCCFC4` | faixa "greige" (O Studio, Por dentro do Studio) | — |
| `--c-blush` | `#F0E0D9` | sacola da marca: CTA final, tags suaves | — |
| `--c-rose` | `#B98583` | só decorativo (fallback do nome gigante) | 2,75:1, não usar em texto |
| `--c-berry` | `#8A3553` | magenta do letreiro, escurecido: traço à mão, destaques | 6,84:1 no creme |
| `--c-cocoa` | `#4A3631` | botões escuros (texto creme: 9,97:1) | — |
| `--c-ink` | `#261C1A` | texto principal | 14,7:1 |
| `--c-text-2` | `#665249` | texto secundário | 6,47:1 no creme, 4,80:1 no greige |
| `--c-night` | `#2B201D` | rodapé | — |

Nome gigante: degradê `#ECD6D0 → #C79591 → #9E5A63` (de cima para baixo), como no GESTWŁOSY. É decorativo (`aria-hidden`).

### Tipografia

- **Jost** (variável 100–900, já existia): interface, corpo e títulos finos (peso 300) com trecho em negrito (600), no estilo do SHEAR. Também o nome gigante (400 na hero, 300 no rodapé). Combina com o "STUDIO" e o "ESPECIALISTA EM MEGA HAIR" da fachada, que são geométricos.
- **Newsreader** (serifa): título da hero, CTA final e depoimentos. Arquivo `newsreader-latin-display.woff2` é uma instância fixa em `opsz 60`, pesos 300–500, subset latin (46 KB), gerada com fonttools a partir do `@fontsource-variable/newsreader` (licença OFL). Sem itálico de propósito.
- Caixa alta só no menu (0.75rem, tracking 0.08em) e no nome da marca.

| Estilo | Tamanho |
|---|---|
| Título da hero (serifa) | `--t-hero` no celular; `clamp(2.6rem, 4.3cqi, 4rem)` no desktop (acompanha a coluna) |
| `.title` (Jost 300) | `--t-h2` = `clamp(2rem, 1.35rem + 2.3vw, 3.4rem)` |
| Títulos de seção grandes (Mega Hair, Por dentro do Studio, Contato) | até 4.75rem |
| Corpo | 1rem / 1.65 |

### Forma, espaço, movimento

- Fotos: **canto reto**. Cards e tags: `--r-card` (22px) e pílula (999px).
- Botões: pílula, 48px de altura, texto em caixa normal. `.btn--dark` (cacau), `.btn--light` (branco com fio), `.btn--line` (só fio).
- Tags: `.pill`, `.pill--soft` (rosé), `.pill--dark` (preto), `.pill--todo` (tracejada = a confirmar).
- Container 1240px, gutter `clamp(1.25rem, 4vw, 3rem)`, respiro de seção `clamp(4.5rem, 8vw, 8rem)`.
- `--slant`: corte diagonal entre a hero e "O Studio" (`clip-path`), como no SHEAR.
- Entradas: opacidade + 16px, 700ms, sem cascata em cada item. `prefers-reduced-motion` desliga tudo.

## 3. Componentes de assinatura

- **Nome gigante** (`.hero__giant`, `.footer__giant`): "Monique Marques" de fora a fora. O tamanho usa unidades de container (`cqi`) divididas pela largura real do texto em Jost, então sempre ocupa a largura do container. Duas linhas no celular. A foto da hero fica na frente da metade de baixo das letras.
- **Traço à mão** (`<smm-scribble>`): sublinhado duplo em magenta sob uma palavra ("Mega Hair", "horário?"), desenhado com `stroke-dashoffset` quando a hero entra ou quando o bloco aparece.
- **Split com sangria** (`.split`, `.split--flip`): texto em 5 colunas e foto em 7, a foto vai até a borda da tela.
- **Card de tags** (`.scope` em Serviços): pílulas alternando rosé e preto, como o "Scope of Work" do GESTWŁOSY. Itens não confirmados aparecem tracejados.
- **Card do vídeo** (`.filmcard` na hero): miniatura do neon + "Assista à inauguração · 1:11", abre o diálogo do vídeo completo.

## 4. Seções

```
Header    links à esquerda · monograma + MONIQUE MARQUES no centro · Instagram + "Agendar horário" à direita
Hero      creme · MONIQUE MARQUES gigante · foto na frente · título serifado à esquerda · card do vídeo à direita
O Studio  greige, topo na diagonal · título Jost fino com "Studio Monique Marques:" em negrito · foto sangrando à direita
Mega Hair branco · foto sangrando à esquerda · título grande · card de tags · botão
Por dentro do Studio  greige · título centralizado · 4 fotos do espaço (rolagem lateral no celular)
Antes e depois  creme · comparador (placeholder até ter fotos reais)
Clientes  creme · depoimentos reais (placeholder até ter)
CTA       rosé · "Vamos marcar o seu horário?" com traço à mão · foto da sacola da marca
Contato   branco · lista WhatsApp / Instagram / Endereço / Horários · mapa
Rodapé    noite · links · MONIQUE MARQUES gigante · direitos
```

Mobile: barra fixa "Agendar pelo WhatsApp" depois da hero; menu em tela cheia com links grandes em Jost 300.

## 5. Abertura

Mesma lógica da v1 (vídeo real do corte da fita, uma vez por sessão, `?abertura` para rever, pulável, não roda com movimento reduzido / economia de dados / 2G, falha de vídeo encerra sozinha). O que saiu: íris dourada, anel, brilho no corte e varredura no monograma.

| Tempo | O que acontece |
|---|---|
| 0–1,4 s | Monograma e "Studio Monique Marques" sobre o creme (fade de 900 ms) |
| 1,4 s | Vídeo entra em fade (600 ms): plano aberto, ela diante da fita |
| clip 1,85 s | Corte para o close-up das tesouras (no celular, reenquadra em `30% 50%`) |
| clip 3,45 s | Dissolve no creme (650 ms) e a hero entra |

Marcos do clipe: `FILM` em `opening.ts`.

O vídeo começa com `play()` logo depois da marca, sem esperar `canplay`: o Safari do iPhone (e o Chrome em rede móvel) não baixa nada antes do `play()`, então esperar o `canplay` fazia a abertura ser pulada no celular. A cena do vídeo só aparece no evento `playing`; se ele não chegar em 8 s, a abertura encerra sozinha.

## 6. Acessibilidade e performance

- axe-core (WCAG 2.1 AA + boas práticas): 0 violações em 1440px e 390px.
- Nome gigante e traço à mão são `aria-hidden`; o título da hero é texto real ("Especialista em Mega Hair").
- Rolagem lateral das fotos no celular é focável (`tabindex="0"`) para quem navega pelo teclado.
- Fontes: 2 arquivos (Jost 26 KB + Newsreader 46 KB), ambos pré-carregados. A v1 tinha 3 (≈125 KB).
- Fotos novas do espaço: 576–600 × 720, 11–24 KB cada (webp).

## 7. Inventário de imagens (todas reais)

| Arquivo | Origem | Uso |
|---|---|---|
| `images/hero-portrait.webp` | frame 37,25 s do vídeo original | hero |
| `images/about-wide.webp` | frame 36,90 s | O Studio |
| `images/mega-hair.webp` | frame 22,0 s | Mega Hair |
| `images/studio/neon.webp` | `media/film/inauguracao-720.mp4`, 4,2 s | Por dentro do Studio, card do vídeo |
| `images/studio/lavatorios.webp` | idem, 5,2 s | Por dentro do Studio |
| `images/studio/espelho.webp` | idem, 7,0 s | Por dentro do Studio |
| `images/studio/caixa.webp` | idem, 22,8 s | Por dentro do Studio |
| `images/studio/sacola.webp` | idem, 27,4 s | CTA final |
| `og-image.jpg` | 1200 × 630: frame 36,90 s recortado (fundo removido com rembg / BiRefNet), por cima do nome gigante | compartilhamento |
| `media/opening/*`, `media/film/*` | vídeo da inauguração | abertura e diálogo do vídeo |
| `brand/*.svg` | logo dourada vetorizada | header, abertura, rodapé, favicon |

As fotos novas vêm do arquivo 720p; por isso aparecem em tamanho médio (até ~300 px de largura no desktop). Se a cliente tiver o vídeo original em 1080p ou fotos do espaço, vale trocar.
