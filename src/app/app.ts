import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IntroService } from './core/intro.service';
import { About } from './features/about/about';
import { Contact } from './features/contact/contact';
import { Differentials } from './features/differentials/differentials';
import { FinalCta } from './features/final-cta/final-cta';
import { Footer } from './features/footer/footer';
import { Header } from './features/header/header';
import { Hero } from './features/hero/hero';
import { Opening } from './features/opening/opening';
import { Results } from './features/results/results';
import { Services } from './features/services/services';
import { Studio } from './features/studio/studio';
import { Testimonials } from './features/testimonials/testimonials';
import { WhatsappBar } from './features/whatsapp-bar/whatsapp-bar';

@Component({
  selector: 'app-root',
  imports: [Opening, Header, Hero, About, Services, Studio, Results, Differentials, Testimonials, FinalCta, Contact, Footer, WhatsappBar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (intro.active()) {
      <smm-opening />
    }

    <!-- Durante a abertura o conteúdo fica inert: sem foco, sem leitor de tela, sem scroll -->
    <div class="site" [attr.inert]="intro.active() ? '' : null">
      <a class="skip-link" href="#main">Ir para o conteúdo</a>
      <smm-header />
      <main id="main" tabindex="-1">
        <smm-hero />
        <smm-about />
        <smm-services />
        <smm-studio />
        <smm-results />
        <smm-differentials />
        <smm-testimonials />
        <smm-final-cta />
        <smm-contact />
      </main>
      <smm-footer />
      <smm-whatsapp-bar />
    </div>
  `,
  styles: `
    main {
      display: block;
      outline: none;
    }
  `,
})
export class App {
  protected readonly intro = inject(IntroService);
}
