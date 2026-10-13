# Studio Monique Marques — Landing Page

HTML + CSS + JS puro (sem dependências, sem build). Deploy direto na Vercel: importe a pasta como projeto estático (Framework Preset: **Other**).

## O que falta preencher (tudo em `js/config.js`)

| Item | Onde | Status |
|---|---|---|
| WhatsApp oficial | `whatsapp: "5581..."` | **pendente** — enquanto vazio, os botões abrem o Direct do Instagram |
| Endereço / horário | `endereco`, `horario` | opcional — só aparece no rodapé se preenchido |
| Depoimentos reais | `depoimentos: [{ texto, nome }]` | vazio → seção vira convite para o Instagram |
| Antes e depois | `antesDepois: [{ antes, depois, alt }]` | vazio → bloco fica oculto |

## Fotos (pasta `images/`)

Basta salvar com estes nomes — se faltar alguma, aparece uma moldura bege indicando o arquivo:

- `hero.jpg` — foto principal (vertical 4:5, ~1200×1500)
- `monique.jpg` — foto da profissional (vertical 3:4)
- `detalhe.jpg` — detalhe/acabamento (vertical)
- `cta.jpg` — cabelo de alta qualidade (quadrada)
- `galeria-01.jpg` … `galeria-06.jpg` — resultados (pode adicionar mais no config)
- `og.jpg` — imagem de compartilhamento (1200×630)

Dica de performance: exporte em JPG/WebP com qualidade ~80 e largura máx. de 1600px.

Não usar fotos de banco de imagens como se fossem trabalhos do estúdio.
