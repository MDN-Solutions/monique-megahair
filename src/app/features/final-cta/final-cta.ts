import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../../core/reveal';
import { SITE } from '../../core/site.config';
import { hasWhatsapp, whatsappUrl } from '../../core/whatsapp';
import { Scribble } from '../../shared/scribble';

@Component({
  selector: 'smm-final-cta',
  imports: [Reveal, Scribble],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="cta" aria-labelledby="cta-title">
      <div class="container cta__inner">
        <div class="cta__copy reveal" smmReveal>
          <h2 id="cta-title" class="cta__title serif">
            {{ cta.title }} <smm-scribble>{{ cta.highlight }}</smm-scribble>
          </h2>
          <p class="cta__text text-2">{{ cta.text }}</p>
          <a
            class="btn btn--dark"
            [href]="wa"
            [attr.target]="waExternal ? '_blank' : null"
            [attr.rel]="waExternal ? 'noopener' : null"
          >
            {{ cta.button }}
          </a>
        </div>

        <div class="photo cta__photo reveal" smmReveal>
          <img [src]="cta.image.src" [alt]="cta.image.alt" width="576" height="720" loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  `,
  styles: `
    @use '../../../styles/tokens' as *;

    .cta {
      padding-block: var(--section-y);
      background: var(--c-blush);
    }
    .cta__inner {
      display: grid;
      gap: clamp(2.5rem, 6vw, 5rem);
      align-items: center;

      @include up($bp-md) {
        grid-template-columns: minmax(0, 7fr) minmax(0, 4fr);
      }
    }
    .cta__copy {
      display: grid;
      justify-items: start;
      gap: 1.5rem;
    }
    .cta__title {
      font-size: clamp(2.6rem, 1.5rem + 4.6vw, 5.75rem);
      line-height: 1.02;
    }
    .cta__text {
      max-width: 28rem;
      margin-top: 0.5rem;
    }
    .cta__photo {
      aspect-ratio: 4 / 5;
      width: min(100%, 420px);
      justify-self: end;
      background: var(--c-paper);
    }
  `,
})
export class FinalCta {
  protected readonly cta = SITE.finalCta;
  protected readonly wa = whatsappUrl();
  protected readonly waExternal = hasWhatsapp();
}
