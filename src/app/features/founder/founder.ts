import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../../core/reveal';
import { SITE } from '../../core/site.config';

/** "Quem é Monique": foto e a história da fundadora do Studio, lado a lado. */
@Component({
  selector: 'smm-founder',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="monique" class="section founder" aria-labelledby="founder-title">
      <div class="container founder__grid">
        <div class="founder__copy">
          <header class="reveal" smmReveal>
            <p class="eyebrow">{{ f.eyebrow }}</p>
            <h2 id="founder-title" class="founder__title">{{ f.title }}</h2>
          </header>
          <div class="founder__text">
            @for (p of f.paragraphs; track p; let i = $index) {
              <p class="lead reveal" smmReveal [style.--i]="i + 1">{{ p }}</p>
            }
          </div>
        </div>

        <figure class="founder__figure reveal" smmReveal style="--i: 1">
          <div class="founder__frame">
            <img [src]="f.image.src" [alt]="f.image.alt" width="1005" height="1161" loading="lazy" decoding="async" />
          </div>
        </figure>
      </div>
    </section>
  `,
  styles: `
    @use '../../../styles/tokens' as *;

    .founder {
      background: #faf7f0;
      border-block: 1px solid var(--line-gold);
    }
    .founder__grid {
      display: grid;
      gap: clamp(2.5rem, 6vw, 5rem);

      @include up($bp-lg) {
        grid-template-columns: minmax(0, 6fr) minmax(0, 5fr);
        align-items: center;
      }
    }
    .founder__copy {
      display: grid;
      gap: clamp(1.5rem, 3vw, 2.25rem);
      align-content: start;
    }
    .founder__title {
      margin-top: 1.25rem;
      font-size: var(--t-h2);
      line-height: 1.1;
    }
    .founder__text {
      display: grid;
      gap: 1.25rem;
      max-width: 38rem;
    }
    .founder__frame {
      aspect-ratio: 4 / 5;
      overflow: hidden;
      border-radius: var(--radius);
      outline: 1px solid var(--line-gold);
      outline-offset: 8px;
      background: var(--c-champagne);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 50% 30%;
      }
    }
    .founder__figure {
      margin: 0;
      max-width: 460px;
      width: 100%;
      justify-self: center;

      @include up($bp-lg) {
        justify-self: end;
      }
    }
  `,
})
export class Founder {
  protected readonly f = SITE.founder;
}
