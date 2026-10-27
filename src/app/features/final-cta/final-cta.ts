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
            {{ lead }} <em class="gold">{{ accent }}</em>
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
      position: relative;
      overflow: clip;
      padding-block: var(--section-y);
      background: var(--c-ivory);
      border-top: 1px solid var(--line);
    }
    .cta__inner {
      position: relative;
      display: grid;
      gap: clamp(2.5rem, 6vw, 5rem);
      align-items: center;

      @include up($bp-lg) {
        grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
      }
    }
    .cta__media .arch {
      width: min(100%, 420px);
      margin-inline: auto;

      @include up($bp-lg) {
        width: min(100%, 460px);
      }
    }
    .cta__copy {
      display: grid;
      justify-items: start;
      gap: clamp(1.25rem, 2.4vw, 2rem);
    }
    .cta__title {
      font-size: clamp(2rem, 1.2rem + 3vw, 3.75rem);
      line-height: 1.05;
      letter-spacing: -0.015em;
    }
    .cta__copy .lead {
      max-width: 32rem;
    }
  `,
})
export class FinalCta {
  protected readonly cta = SITE.finalCta;
  protected readonly wa = whatsappUrl();
  protected readonly waExternal = hasWhatsapp();

  /** Destaca em itálico dourado as duas últimas palavras do título. */
  private readonly words = SITE.finalCta.title.split(' ');
  protected readonly lead = this.words.slice(0, -2).join(' ');
  protected readonly accent = this.words.slice(-2).join(' ');
}
