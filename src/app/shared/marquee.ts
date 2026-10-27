import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../core/site.config';

/** Faixa fina com os valores do Studio, losangos dourados e rolagem lenta. Decorativa: o texto existe na seção Sobre. */
@Component({
  selector: 'smm-marquee',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <div class="track">
      @for (copy of copies; track copy) {
        <ul class="row">
          @for (w of words; track w) {
            <li>{{ w }}</li>
          }
        </ul>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
      overflow: hidden;
      border-block: 1px solid var(--line-gold);
      background: #faf7f0;
    }
    .track {
      display: flex;
      width: max-content;
      animation: slide 48s linear infinite;
    }
    .row {
      display: flex;
      flex: none;
    }
    li {
      display: inline-flex;
      align-items: center;
      gap: 2.25rem;
      padding: 1.1rem 0 1.1rem 2.25rem;
      font-size: 0.8125rem;
      font-weight: 500;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      white-space: nowrap;
      color: var(--c-gold-text);
    }
    li::after {
      content: '';
      width: 6px;
      height: 6px;
      background: var(--c-gold);
      transform: rotate(45deg);
    }
    @keyframes slide {
      to { transform: translateX(-50%); }
    }
    @media (prefers-reduced-motion: reduce) {
      .track { animation: none; }
      .row:nth-child(n + 2) { display: none; }
      .row { flex-wrap: wrap; justify-content: center; width: 100%; }
      .track { width: 100%; }
    }
  `,
})
export class Marquee {
  /** Mesmos termos já confirmados em "Sobre": nada novo é afirmado. */
  protected readonly words = ['Mega Hair', ...SITE.about.pillars];
  // duas cópias idênticas: -50% fecha o loop sem salto
  protected readonly copies = [0, 1, 2, 3];
}
