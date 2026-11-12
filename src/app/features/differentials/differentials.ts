import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../../core/reveal';
import { DIFFERENTIALS, DIFFERENTIAL_PLACEHOLDERS, SITE } from '../../core/site.config';

/**
 * "Diferenciais": título à esquerda e a lista numerada à direita (01, 02…).
 * Funciona bem com 2 itens ou com 4 — não depende de preencher colunas.
 */
@Component({
  selector: 'smm-differentials',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="diferenciais" class="section diff" aria-labelledby="diff-title">
      <div class="container diff__layout">
        <header class="sec-head diff__head reveal" smmReveal>
          <p class="eyebrow">{{ copy.eyebrow }}</p>
          <h2 id="diff-title" class="diff__title">{{ copy.title }}</h2>
        </header>

        <ol class="diff__list">
          @for (d of items; track d.title; let i = $index) {
            <li class="diff__item reveal" smmReveal [style.--i]="i + 1" [class.diff__item--ph]="isPlaceholder(i)">
              <span class="diff__num" aria-hidden="true">{{ i < 9 ? '0' + (i + 1) : i + 1 }}</span>
              <h3 class="diff__name">{{ d.title }}</h3>
              <p class="diff__text">{{ d.text }}</p>
              @if (isPlaceholder(i)) {
                <span class="diff__tag">A confirmar</span>
              }
            </li>
          }
        </ol>
      </div>
    </section>
  `,
  styles: `
    @use '../../../styles/tokens' as *;

    // fundo creme e fios dourados, como em "Quem é Monique": separa a seção dos blocos brancos vizinhos
    .diff {
      background: var(--c-cream);
      border-block: 1px solid var(--line-gold);
    }
    .diff__layout {
      display: grid;
      gap: clamp(1.5rem, 4vw, 2.5rem);

      @include up($bp-lg) {
        grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
        gap: clamp(3rem, 6vw, 6rem);
        align-items: start;
      }
    }
    .diff__head {
      margin-bottom: 0;
    }
    // o fio dourado do topo da lista fica na mesma altura do fio do título
    .diff__list {
      display: grid;
      margin: 0;
      padding: 0;
      list-style: none;
      border-top: 1px solid var(--line-gold);
    }
    .diff__item {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      column-gap: clamp(1.25rem, 3vw, 2.5rem);
      row-gap: 0.5rem;
      align-items: baseline;
      padding-block: clamp(1.5rem, 3vw, 2.25rem);
      border-bottom: 1px solid var(--line);

      &:last-child {
        border-bottom: 0;
        padding-bottom: 0;
      }
    }
    .diff__num {
      grid-row: span 3;
      min-width: 2ch;
      font-family: var(--f-display);
      font-size: clamp(2.25rem, 1.6rem + 2vw, 3.25rem);
      font-weight: 300;
      line-height: 1;
      font-variant-numeric: tabular-nums;
      color: var(--c-gold);
    }
    .diff__name {
      font-size: var(--t-h3);
      line-height: 1.2;
    }
    .diff__text {
      grid-column: 2;
      max-width: 34rem;
      font-size: 0.975rem;
      line-height: 1.6;
      color: var(--c-text-muted);
    }
    .diff__tag {
      grid-column: 2;
      justify-self: start;
      margin-top: 0.4rem;
      padding: 0.25rem 0.6rem;
      font-size: 0.6875rem;
      font-weight: 500;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--c-gold-text);
      border: 1px dashed var(--c-gold);
    }
    .diff__item--ph .diff__num {
      opacity: 0.55;
    }
  `,
})
export class Differentials {
  protected readonly copy = SITE.differentials;
  private readonly confirmed = DIFFERENTIALS.length;
  protected readonly items = SITE.showPlaceholders ? [...DIFFERENTIALS, ...DIFFERENTIAL_PLACEHOLDERS] : DIFFERENTIALS;

  protected isPlaceholder(index: number): boolean {
    return index >= this.confirmed;
  }
}
