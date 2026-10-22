import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { hasWhatsapp, whatsappUrl } from '../../core/whatsapp';
import { Icon } from '../../shared/icon';

/**
 * Barra fixa de agendamento no celular/tablet: depois que a hero sai da tela,
 * o WhatsApp continua a um toque de distância. Some no desktop (o header já tem o botão).
 */
@Component({
  selector: 'smm-whatsapp-bar',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.is-visible]': 'visible()',
    '(window:scroll)': 'onScroll()',
  },
  template: `
    <a
      class="btn btn--dark bar"
      [href]="wa"
      [attr.target]="external ? '_blank' : null"
      [attr.rel]="external ? 'noopener' : null"
      [attr.tabindex]="visible() ? null : -1"
    >
      <smm-icon name="whatsapp" style="--icon-size: 1.25rem" />
      Agendar pelo WhatsApp
    </a>
  `,
  styles: `
    @use '../../../styles/tokens' as *;

    :host {
      position: fixed;
      inset: auto 0 0 0;
      z-index: 90;
      padding: 0.75rem var(--gutter) max(0.75rem, env(safe-area-inset-bottom));
      background: linear-gradient(180deg, transparent, rgba(246, 240, 234, 0.94) 45%);
      transform: translateY(110%);
      transition: transform 0.5s var(--ease);
      pointer-events: none;

      @include up($bp-lg) {
        display: none;
      }
    }
    :host(.is-visible) {
      transform: none;
      pointer-events: auto;
    }
    .bar {
      width: 100%;
      min-height: 52px;
    }
  `,
})
export class WhatsappBar {
  protected readonly wa = whatsappUrl();
  protected readonly external = hasWhatsapp();
  protected readonly visible = signal(false);

  protected onScroll(): void {
    this.visible.set(window.scrollY > window.innerHeight * 0.7);
  }
}
