import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../../core/reveal';
import { SITE, TESTIMONIALS } from '../../core/site.config';

/** Só depoimentos reais. Sem nenhum, a seção vira um aviso de placeholder (ou some com showPlaceholders = false). */
@Component({
  selector: 'smm-testimonials',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (items.length > 0 || showPlaceholder) {
      <section id="depoimentos" class="section testi" aria-labelledby="testi-title">
        <div class="container">
          <h2 id="testi-title" class="title testi__title reveal" smmReveal>{{ copy.title }}</h2>

          @if (items.length > 0) {
            <ul class="testi__list">
              @for (t of items; track $index) {
                <li class="reveal" smmReveal>
                  <figure class="quote">
                    <blockquote class="quote__text serif">&ldquo;{{ t.quote }}&rdquo;</blockquote>
                    <figcaption class="quote__by">
                      {{ t.name }}
                      @if (t.detail) {
                        <span class="text-2"> · {{ t.detail }}</span>
                      }
                    </figcaption>
                  </figure>
                </li>
              }
            </ul>
          } @else {
            <div class="testi__ph reveal" smmReveal>
              <p class="testi__ph-text serif">&ldquo;O depoimento de uma cliente entra aqui.&rdquo;</p>
              <p class="todo-note"><strong>Placeholder:</strong> só depoimentos reais, enviados ou autorizados pelas clientes.</p>
            </div>
          }
        </div>
      </section>
    }
  `,
  styles: `
    @use '../../../styles/tokens' as *;

    .testi {
      border-top: 1px solid var(--line);
    }
    .testi__title {
      margin-bottom: clamp(2rem, 4vw, 3rem);
    }
    .testi__list {
      display: grid;
      gap: clamp(2rem, 4vw, 3rem);

      @include up($bp-md) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    .quote {
      display: grid;
      gap: 1.25rem;
    }
    .quote__text {
      font-size: clamp(1.4rem, 1.15rem + 1vw, 2rem);
      line-height: 1.3;
    }
    .quote__by {
      font-size: var(--t-small);
      font-weight: 500;
    }
    .testi__ph {
      display: grid;
      gap: 1rem;
      max-width: 40rem;
      padding: clamp(1.5rem, 3vw, 2.25rem);
      border: 1px dashed var(--line-strong);
      border-radius: var(--r-card);
    }
    .testi__ph-text {
      font-size: clamp(1.4rem, 1.15rem + 1vw, 2rem);
      line-height: 1.3;
      color: var(--c-text-2);
    }
  `,
})
export class Testimonials {
  protected readonly copy = SITE.testimonials;
  protected readonly items = TESTIMONIALS;
  protected readonly showPlaceholder = TESTIMONIALS.length === 0 && SITE.showPlaceholders;
}
