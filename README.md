# Studio Monique Marques — Landing page

Angular 21 (standalone, signals, zoneless) + SCSS. Sem bibliotecas de animação: a abertura usa o vídeo real da inauguração, sincronizado por `currentTime` + CSS.

## Rodar

```bash
npm install --legacy-peer-deps   # necessário por causa de um bug do arborist com peer deps
npm start                        # http://localhost:4200
npm run build                    # saída em dist/studio-monique-marques (≈ 58 kB transferidos no JS/CSS inicial)
```

Node 22.x. O Angular CLI está fixado na versão 21 porque a 22 exige Node ≥ 22.22.3.

## Preencher o conteúdo

Tudo que é dado do negócio está em **`src/app/core/site.config.ts`**:

| O que | Onde | Observação |
| --- | --- | --- |
| WhatsApp, Instagram, endereço, mapa, horários | `SITE.contact` | Vazio = placeholder visível; os botões de WhatsApp rolam para `#contato` até haver número |
| Serviços | `SERVICES` | Hoje só "Mega Hair" (confirmado). Adicione os demais quando confirmados |
| Diferenciais | `DIFFERENTIALS` | Dois confirmados; os outros estão em `DIFFERENTIAL_PLACEHOLDERS` |
| Resultados (antes/depois e galeria) | `RESULTS` | Só entram fotos reais e autorizadas. Vazio = placeholder |
| Depoimentos | `TESTIMONIALS` | Só depoimentos reais. Vazio = placeholder |
| Mostrar/ocultar placeholders | `SITE.showPlaceholders` | **Mude para `false` antes de publicar** — seções sem conteúdo real somem |

Também falta, antes de publicar: URL absoluta do domínio em `src/index.html` (`canonical`, `og:url`, `og:image`) e endereço no JSON-LD.

## Abertura cinematográfica

- Código: `src/app/features/opening/`. Vídeo em `public/media/opening/` (1080p/720p, mp4 + webm).
- Toca **uma vez por sessão** (`sessionStorage: smm.opening.seen`). Para rever: `/?abertura`.
- Não toca com `prefers-reduced-motion`, `saveData` ou conexão 2G. Tem botão "Pular abertura" e tecla Esc.
- Se o vídeo falhar/não iniciar, a abertura encerra sozinha e o site aparece normalmente.
- Se o clipe for reeditado, ajuste só `FILM` (`matchCut`, `cut`, `veil`) em `opening.ts`.

## Design

Especificação completa (tokens, tipografia, grid, storyboard da abertura, decisões): `docs/DESIGN-SPEC.md`.
