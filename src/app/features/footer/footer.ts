import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HAS_CONTACT, RESULTS, SITE } from '../../core/site.config';

@Component({
  selector: 'smm-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="container footer__grid">
        <div class="footer__brand">
          <img src="brand/monogram.svg" alt="" width="84" height="84" loading="lazy" />
          <p class="footer__tag">{{ site.tagline }}</p>
        </div>

        <nav class="footer__nav" aria-label="Rodapé">
          <ul>
            @for (item of nav; track item.id) {
              <li><a [href]="'#' + item.id">{{ item.label }}</a></li>
            }
          </ul>
        </nav>
      </div>

      <p class="footer__name" aria-hidden="true">Monique Marques</p>

      <div class="container">
        <div class="footer__legal">
          <p>&copy; {{ year }} {{ site.name }}. Todos os direitos reservados.</p>
          <a href="#inicio" class="footer__top">Voltar ao topo</a>
        </div>
      </div>
    </footer>
  `,
  styles: `
    @use '../../../styles/tokens' as *;

    .footer {
      padding-top: clamp(3.5rem, 7vw, 6rem);
      color: var(--c-ivory);
      background: var(--c-ink);
    }
    .footer__grid {
      display: grid;
      gap: 3rem;
      align-items: center;
      padding-bottom: clamp(2.5rem, 5vw, 4rem);

      @include up($bp-md) {
        grid-template-columns: 1fr auto;
        align-items: end;
      }
    }
    .footer__brand {
      display: grid;
      justify-items: start;
      gap: 1.5rem;
    }
    .footer__tag {
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: var(--c-champagne);
    }
    // nome em escala gigante: elemento de identidade, decorativo (aria-hidden)
    .footer__name {
      margin: 0 0 clamp(1.5rem, 3vw, 2.5rem);
      padding-inline: var(--gutter);
      font-family: var(--f-display);
      font-variation-settings: 'opsz' 22;
      font-size: clamp(1.7rem, 8.4vw, 8.5rem);
      line-height: 1;
      letter-spacing: -0.015em;
      text-align: center;
      text-transform: uppercase;
      white-space: nowrap;
      overflow: hidden;
      background: linear-gradient(180deg, var(--c-gold-light), var(--c-gold) 55%, #8f7238);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      user-select: none;
    }
    .footer__nav ul {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem 2rem;

      @include up($bp-md) {
        gap: 0.25rem 2.5rem;
        justify-content: flex-end;
      }
    }
    .footer__nav a {
      display: inline-flex;
      align-items: center;
      min-height: 44px;
      font-size: 0.8125rem;
      font-weight: 500;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--c-champagne);
      transition: color 0.3s var(--ease);

      &:hover {
        color: var(--c-white);
      }
    }
    .footer__legal {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem 2rem;
      padding-block: 1.5rem max(1.5rem, env(safe-area-inset-bottom));
      border-top: 1px solid rgba(232, 212, 176, 0.22);
      font-size: var(--t-small);
      color: #c9c3b8;
    }
    .footer__top {
      display: inline-flex;
      align-items: center;
      min-height: 44px;
      color: var(--c-champagne);
    }
  `,
})
export class Footer {
  protected readonly site = SITE;
  protected readonly year = new Date().getFullYear();

  protected readonly nav = [
    { id: 'sobre', label: 'Sobre' },
    { id: 'servicos', label: 'Serviços' },
    ...(RESULTS.length > 0 || SITE.showPlaceholders ? [{ id: 'resultados', label: 'Resultados' }] : []),
    ...(HAS_CONTACT ? [{ id: 'contato', label: 'Contato' }] : []),
  ];
}
