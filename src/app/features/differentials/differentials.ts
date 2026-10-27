import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../../core/reveal';
import { DIFFERENTIALS, DIFFERENTIAL_PLACEHOLDERS, SITE } from '../../core/site.config';
import { Icon } from '../../shared/icon';

@Component({
  selector: 'smm-differentials',
  imports: [Reveal, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="diferenciais" class="section diff" aria-labelledby="diff-title">
      <div class="container">
        <header class="diff__head reveal" smmReveal>
          <p class="eyebrow">{{ copy.eyebrow }}</p>
          <h2 id="diff-title" class="diff__title">{{ copy.title }}</h2>
        </header>

        <ul class="diff__list" [style.--cols]="items.length > 4 ? 4 : items.length">
          @for (d of items; track d.title; let i = $index) {
            <li class="diff__item reveal" smmReveal [style.--i]="i" [class.diff__item--ph]="isPlaceholder(i)">
              <span class="diff__icon"><smm-icon [name]="d.icon" style="--icon-size: 2rem" /></span>
              <h3 class="diff__name">{{ d.title }}</h3>
              <p class="diff__text">{{ d.text }}</p>
              @if (isPlaceholder(i)) {
                <span class="diff__tag">A confirmar</span>
              }
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    @use '../../../styles/tokens' as *;

    .diff__head {
      display: grid;
      gap: 1.5rem;
      max-width: 40rem;
      margin-bottom: clamp(2.5rem, 5vw, 4rem);
    }
    .diff__title {
      font-size: var(--t-h2);
      line-height: 1.08;
    }
    .diff__list {
      display: grid;
      gap: 0;
      border-top: 1px solid var(--line);

      // tablet: 2 colunas (evita um 4º item sozinho na segunda linha); desktop: uma coluna por item
      @include up($bp-md) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      @include up($bp-lg) {
        grid-template-columns: repeat(var(--cols, 4), minmax(0, 1fr));
      }
    }
    .diff__item {
      position: relative;
      display: grid;
      align-content: start;
      gap: 0.9rem;
      padding: 2rem 0;
      border-bottom: 1px solid var(--line);

      @include up($bp-md) {
        padding: 2.25rem 2rem 2.25rem 0;
        border-bottom: 0;

        &:nth-child(even) {
          padding-left: 2rem;
          border-left: 1px solid var(--line);
        }
        &:nth-child(n + 3) {
          border-top: 1px solid var(--line);
        }
      }
      @include up($bp-lg) {
        &:nth-child(n + 2) {
          padding-left: 2rem;
          border-left: 1px solid var(--line);
        }
        &:nth-child(n + 3) {
          border-top: 0;
        }
      }
    }
    .diff__icon {
      color: var(--c-ink);
    }
    .diff__name {
      font-size: var(--t-h3);
      line-height: 1.2;
    }
    .diff__text {
      font-size: 0.975rem;
      line-height: 1.6;
      color: var(--c-text-muted);
    }
    .diff__tag {
      justify-self: start;
      padding: 0.25rem 0.6rem;
      font-size: 0.6875rem;
      font-weight: 500;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--c-gold-text);
      border: 1px dashed var(--c-gold);
    }
    .diff__item--ph .diff__icon {
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
