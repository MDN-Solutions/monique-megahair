import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../../core/reveal';
import { SITE, TESTIMONIALS, TESTIMONIAL_PLACEHOLDERS } from '../../core/site.config';

@Component({
  selector: 'smm-testimonials',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (visible) {
      <section id="depoimentos" class="section testi" aria-labelledby="testi-title">
        <div class="container">
          <header class="testi__head reveal" smmReveal>
            <p class="eyebrow">{{ copy.eyebrow }}</p>
            <h2 id="testi-title" class="testi__title">{{ copy.title }}</h2>
          </header>

          <ul class="testi__list">
            @for (t of items; track $index; let i = $index) {
              <li class="reveal" smmReveal [style.--i]="i">
                <figure class="quote" [class.quote--ph]="placeholder">
                  <span class="quote__mark" aria-hidden="true">&ldquo;</span>
                  <blockquote class="quote__text">{{ t.quote }}</blockquote>
                  <figcaption class="quote__by">
                    <span class="quote__name">{{ t.name }}</span>
                    @if (t.detail) {
                      <span class="quote__detail">{{ t.detail }}</span>
                    }
                  </figcaption>
                </figure>
              </li>
            }
          </ul>
        </div>
      </section>
    }
  `,
  styles: `
    @use '../../../styles/tokens' as *;

    .testi {
      background: linear-gradient(180deg, var(--c-ivory), #f4ecdc 50%, var(--c-ivory));
    }
    .testi__head {
      display: grid;
      gap: 1.5rem;
      max-width: 40rem;
      margin-bottom: clamp(2.5rem, 5vw, 4rem);
    }
    .testi__title {
      font-size: var(--t-h2);
      line-height: 1.08;
    }
    .testi__list {
      display: grid;
      gap: 1.5rem;

      @include up($bp-md) {
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      }
    }
    .quote {
      position: relative;
      display: grid;
      gap: 1.5rem;
      height: 100%;
      padding: clamp(1.75rem, 3vw, 2.5rem);
      background: var(--c-white);
      border: 1px solid var(--line);
    }
    .quote--ph {
      background: var(--c-blush);
      border: 1px dashed var(--c-gold);
    }
    .quote__mark {
      font-family: var(--f-display);
      font-variation-settings: 'opsz' 22;
      font-size: 4.5rem;
      line-height: 0.6;
      color: var(--c-gold);
    }
    .quote__text {
      font-family: var(--f-display);
      font-variation-settings: 'opsz' 11;
      font-style: italic;
      font-size: 1.3rem;
      line-height: 1.45;
    }
    .quote__by {
      display: grid;
      gap: 0.2rem;
      align-self: end;
      padding-top: 1.25rem;
      border-top: 1px solid var(--line-gold);
    }
    .quote__name {
      font-size: 0.8125rem;
      font-weight: 500;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }
    .quote__detail {
      font-size: var(--t-small);
      color: var(--c-text-muted);
    }
  `,
})
export class Testimonials {
  protected readonly copy = SITE.testimonials;
  protected readonly placeholder = TESTIMONIALS.length === 0;
  protected readonly items = TESTIMONIALS.length > 0 ? TESTIMONIALS : SITE.showPlaceholders ? TESTIMONIAL_PLACEHOLDERS : [];
  protected readonly visible = this.items.length > 0;
}
