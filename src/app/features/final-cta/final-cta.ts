import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../../core/reveal';
import { SITE } from '../../core/site.config';
import { hasWhatsapp, whatsappUrl } from '../../core/whatsapp';

@Component({
  selector: 'smm-final-cta',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="cta" aria-labelledby="cta-title">
      <div class="container cta__inner">
        <div class="cta__media reveal" smmReveal>
          <div class="arch">
            <div class="arch__media">
              <img [src]="cta.image.src" [alt]="cta.image.alt" width="900" height="1125" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>

        <div class="cta__copy">
          <h2 id="cta-title" class="cta__title reveal" smmReveal>
            {{ cta.title }}
          </h2>
          <p class="lead reveal" smmReveal style="--i: 1">{{ cta.text }}</p>
          <div class="reveal" smmReveal style="--i: 2">
            <a
              class="btn btn--primary"
              [href]="wa"
              [attr.target]="waExternal ? '_blank' : null"
              [attr.rel]="waExternal ? 'noopener' : null"
            >
              {{ cta.button }}
              <svg class="btn__arrow" viewBox="0 0 18 10" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true">
                <path d="M0 5h16M12 1l4 4-4 4" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    @use '../../../styles/tokens' as *;

    .cta {
      padding-block: var(--section-y);
      background: var(--c-ivory);
      border-top: 1px solid var(--line-gold);
    }
    .cta__inner {
      display: grid;
      gap: clamp(2rem, 5vw, 4.5rem);
      align-items: end;

      @include up($bp-lg) {
        grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
      }
    }
    .cta__inner > * {
      min-width: 0;
    }
    .cta__copy {
      display: grid;
      justify-items: start;
      gap: clamp(1.5rem, 2.6vw, 2.25rem);
    }
    .cta__title {
      font-size: var(--t-h2);
      line-height: 1.15;
    }
    .cta__copy .lead {
      max-width: 30rem;
    }
    .cta__media {
      @include up($bp-lg) {
        order: 2;
      }
    }
    .cta__media .arch {
      outline: 1px solid var(--line-gold);
      outline-offset: 8px;
      border-radius: var(--radius);
      width: min(100%, 440px);
      margin-inline: auto 0;
    }
  `,
})
export class FinalCta {
  protected readonly cta = SITE.finalCta;
  protected readonly wa = whatsappUrl();
  protected readonly waExternal = hasWhatsapp();
}
