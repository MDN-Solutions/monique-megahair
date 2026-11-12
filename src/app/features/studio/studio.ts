import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../../core/reveal';
import { SITE, STUDIO_PHOTOS } from '../../core/site.config';

/** "Por dentro do Studio": fotos reais do novo espaço, todas em retrato 3:4 e com o mesmo peso. */
@Component({
  selector: 'smm-studio',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (photos.length > 0) {
      <section id="studio" class="section studio" aria-labelledby="studio-title">
        <div class="container">
          <header class="sec-head reveal" smmReveal>
            <p class="eyebrow">{{ copy.eyebrow }}</p>
            <h2 id="studio-title" class="studio__title">{{ copy.title }}</h2>
            <p class="lead studio__text">{{ copy.text }}</p>
          </header>

          <div class="studio__grid">
            @for (p of photos; track p.src; let i = $index) {
              <figure class="shot reveal" smmReveal [style.--i]="i">
                <div class="shot__frame">
                  <img [src]="p.src" [alt]="p.alt" [attr.width]="p.width" [attr.height]="p.height" loading="lazy" decoding="async" />
                </div>
                <figcaption class="shot__cap">{{ p.caption }}</figcaption>
              </figure>
            }
          </div>
        </div>
      </section>
    }
  `,
  styles: `
    @use '../../../styles/tokens' as *;

    // celular e tablet: 2x2; a partir do desktop: as quatro fotos lado a lado
    .studio {
      background: #faf7f0;
    }
    .studio__grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.75rem;

      @include up($bp-md) {
        gap: 1.25rem;
      }
      @include up($bp-lg) {
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 1.5rem;
      }
    }
    .shot {
      position: relative;
      margin: 0;
    }
    .shot__frame {
      position: relative;
      aspect-ratio: 3 / 4;
      overflow: hidden;
      border-radius: var(--radius);
      background: var(--c-champagne);
    }
    .shot img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 1.2s var(--ease);
    }
    .shot:hover img {
      transform: scale(1.04);
    }
    .shot__frame::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, transparent 58%, rgba(18, 17, 16, 0.7));
      pointer-events: none;
    }
    .shot__cap {
      position: absolute;
      left: 1rem;
      right: 1rem;
      bottom: 0.9rem;
      z-index: 1;
      font-size: 0.6875rem;
      font-weight: 500;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--c-ivory);
    }
  `,
})
export class Studio {
  protected readonly copy = SITE.studio;
  protected readonly photos = STUDIO_PHOTOS;
}
