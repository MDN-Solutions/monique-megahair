import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RESULTS, SITE } from '../../core/site.config';

@Component({
  selector: 'smm-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="container footer__top">
        <img class="footer__mark" src="brand/monogram.svg" alt="" width="48" height="48" loading="lazy" />

        <nav class="footer__nav" aria-label="Rodapé">
          <ul>
            @for (item of nav; track item.id) {
              <li><a [href]="'#' + item.id">{{ item.label }}</a></li>
            }
            @if (instagram) {
              <li><a [href]="instagram" target="_blank" rel="noopener">Instagram</a></li>
            }
          </ul>
        </nav>

        <a href="#inicio" class="footer__top-link">Voltar ao topo</a>
      </div>

      <div class="container footer__giant-wrap">
        <p class="footer__giant" aria-hidden="true"><span>Monique</span><span>Marques</span></p>
      </div>

      <div class="container footer__legal">
        <p>&copy; {{ year }} {{ site.name }} · {{ site.tagline }}</p>
      </div>
    </footer>
  `,
  styles: `
    @use '../../../styles/tokens' as *;

    .footer {
      padding-top: clamp(3rem, 6vw, 4.5rem);
      color: var(--c-paper);
      background: var(--c-night);
    }
    .footer__top {
      display: grid;
      gap: 1.5rem;
      justify-items: start;

      @include up($bp-md) {
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: 2.5rem;
      }
    }
    .footer__mark {
      width: 48px;
      height: 48px;
    }
    .footer__nav ul {
      display: flex;
      flex-wrap: wrap;
      gap: 0 1.75rem;
    }
    .footer__nav a,
    .footer__top-link {
      display: inline-flex;
      align-items: center;
      min-height: 44px;
      font-size: var(--t-small);
      color: #e4d3cd;
      transition: color 0.2s var(--ease);

      &:hover {
        color: var(--c-white);
      }
    }
    .footer__top-link {
      text-decoration: underline;
      text-decoration-thickness: 1px;
      text-underline-offset: 0.3em;
    }
    .footer__giant-wrap {
      container-type: inline-size;
    }
    // nome da marca de fora a fora, fechando a página como a hero abre: 2 linhas no celular, 1 depois
    // (4.4 e 9.05 = largura do texto em Jost 300, em "em")
    .footer__giant {
      margin-top: clamp(2.5rem, 6vw, 4rem);
      font-size: calc(100cqi / 4.4);

      span {
        display: block;
      }

      @include up($bp-md) {
        font-size: calc(100cqi / 9.05);

        span {
          display: inline;
        }
        span + span {
          margin-left: 0.24em;
        }
      }

      font-weight: 300;
      line-height: 0.8;
      letter-spacing: -0.02em;
      text-transform: uppercase;
      text-align: center;
      white-space: nowrap;
      color: #8c6b67; // 3,33:1, decorativo mas legível como texto grande
      user-select: none;
    }
    .footer__legal {
      // no celular/tablet a barra fixa do WhatsApp cobre o fim da página
      padding-block: 1.75rem calc(max(1.75rem, env(safe-area-inset-bottom)) + 76px);

      @include up($bp-lg) {
        padding-bottom: max(1.75rem, env(safe-area-inset-bottom));
      }
      font-size: var(--t-small);
      color: #c9b2ab;
    }
  `,
})
export class Footer {
  protected readonly site = SITE;
  protected readonly year = new Date().getFullYear();
  protected readonly instagram = SITE.contact.instagram ? `https://instagram.com/${SITE.contact.instagram}` : '';

  protected readonly nav = [
    { id: 'sobre', label: 'O Studio' },
    { id: 'servicos', label: 'Mega Hair' },
    ...(RESULTS.length > 0 || SITE.showPlaceholders ? [{ id: 'resultados', label: 'Resultados' }] : []),
    { id: 'contato', label: 'Contato' },
  ];
}
