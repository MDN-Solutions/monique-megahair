import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../../core/reveal';
import { SITE, STUDIO_PHOTOS } from '../../core/site.config';

/** Fotos reais do espaço (frames do vídeo da inauguração). Referência: faixa "Our Treatments" do SHEAR. */
@Component({
  selector: 'smm-studio',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (photos.length > 0) {
      <section id="espaco" class="section studio" aria-labelledby="studio-title">
        <div class="container">
          <header class="studio__head reveal" smmReveal>
            <h2 id="studio-title" class="title studio__title">{{ copy.title }}</h2>
            <p class="text-2">{{ copy.text }}</p>
          </header>
        </div>

        <!-- no celular a fileira rola na horizontal: tabindex deixa rolar pelo teclado -->
        <ul class="studio__row reveal" smmReveal tabindex="0" aria-label="Fotos do Studio">
          @for (p of photos; track p.src) {
            <li>
              <figure>
                <div class="photo studio__photo">
                  <img [src]="p.src" [alt]="p.alt" width="600" height="720" loading="lazy" decoding="async" />
                </div>
                <figcaption>{{ p.caption }}</figcaption>
              </figure>
            </li>
          }
        </ul>
      </section>
    }
  `,
  styles: `
    @use '../../../styles/tokens' as *;

    .studio {
      background: var(--c-sand);
    }
    .studio__head {
      display: grid;
      justify-items: center;
      gap: 1rem;
      margin-bottom: clamp(2.5rem, 5vw, 4rem);
      text-align: center;
    }
    .studio__title {
      font-size: clamp(2.4rem, 1.4rem + 4vw, 4.75rem);
      line-height: 1.02;
    }
    // celular: rolagem lateral com snap; tablet: 2 colunas; desktop: 4
    .studio__row {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: min(72vw, 300px);
      gap: 0.75rem;
      padding-inline: var(--gutter);
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scroll-padding-inline: var(--gutter);
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }
      li {
        scroll-snap-align: start;
      }

      @include up($bp-md) {
        grid-auto-flow: row;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1rem;
        max-width: calc(var(--container) + var(--gutter) * 2);
        margin-inline: auto;
        overflow: visible;
      }
      @include up($bp-lg) {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }
    .studio__photo {
      aspect-ratio: 5 / 6;
      background: var(--c-paper);
    }
    figcaption {
      margin-top: 0.75rem;
      font-size: var(--t-small);
    }
  `,
})
export class Studio {
  protected readonly copy = SITE.studio;
  protected readonly photos = STUDIO_PHOTOS;
}
