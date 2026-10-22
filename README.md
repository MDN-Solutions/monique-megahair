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
| WhatsApp, Instagram, cidade, endereço, mapa, horários | `SITE.contact` | Vazio = placeholder visível; os botões de WhatsApp rolam para `#contato` até haver número. `city` vira a etiqueta com alfinete na hero |
| Textos das seções | `SITE.hero`, `SITE.about`, `SITE.finalCta`… | Escrever direto, sem frases de efeito (ver `docs/DESIGN-SPEC.md` §1) |
| Serviços | `SERVICES` | O primeiro é o destaque (foto + texto); os demais aparecem em "Outros serviços". Os não confirmados ficam em `SERVICE_PLACEHOLDERS` (tags tracejadas) |
| Diferenciais | `DIFFERENTIALS` | Dois confirmados (tags no card "No atendimento"); os outros estão em `DIFFERENTIAL_PLACEHOLDERS` |
| Fotos do espaço | `STUDIO_PHOTOS` | Quatro frames do vídeo da inauguração, em `public/images/studio/` |
| Resultados (antes/depois e fotos) | `RESULTS` | Só entram fotos reais e autorizadas. Vazio = placeholder |
| Depoimentos | `TESTIMONIALS` | Só depoimentos reais. Vazio = placeholder |
| Mostrar/ocultar placeholders | `SITE.showPlaceholders` | **Mude para `false` antes de publicar** — seções sem conteúdo real somem |

Também falta, antes de publicar: URL absoluta do domínio em `src/index.html` (`canonical`, `og:url`, `og:image`) e endereço no JSON-LD.

## Abertura

- Código: `src/app/features/opening/`. Vídeo em `public/media/opening/` (1080p/720p, mp4 + webm).
- Toca **uma vez por sessão** (`sessionStorage: smm.opening.seen`). Para rever: `/?abertura`.
- Não toca com `prefers-reduced-motion`, `saveData` ou conexão 2G. Tem botão "Pular abertura" e tecla Esc.
- Se o vídeo falhar/não iniciar, a abertura encerra sozinha e o site aparece normalmente.
- Se o clipe for reeditado, ajuste só `FILM` (`matchCut`, `veil`) em `opening.ts`.

## Design

Especificação completa (tokens, tipografia, seções, abertura e o que mudou da v1 para a v2): `docs/DESIGN-SPEC.md`.

Referências visuais da v2: o site SHEAR (títulos finos com trecho em negrito, fotos sangrando até a borda, corte diagonal, botões em pílula) e o case GESTWŁOSY (nome gigante atrás da foto, serifa com traço à mão, tags em pílula).
