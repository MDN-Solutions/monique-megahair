import { ChangeDetectionStrategy, Component, ElementRef, effect, inject, signal, viewChild } from '@angular/core';
import { RESULTS, SITE } from '../../core/site.config';
import { hasWhatsapp, whatsappUrl } from '../../core/whatsapp';
import { Icon } from '../../shared/icon';

interface NavItem {
  id: string;
  label: string;
}

@Component({
  selector: 'smm-header',
  imports: [Icon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.is-scrolled]': 'scrolled()',
    '(window:scroll)': 'onScroll()',
    '(document:keydown.escape)': 'closeMenu()',
  },
})
export class Header {
  protected readonly wa = whatsappUrl();
  protected readonly instagram = SITE.contact.instagram ? `https://instagram.com/${SITE.contact.instagram}` : '';
  protected readonly waExternal = hasWhatsapp();

  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);
  protected readonly active = signal('');

  private readonly firstLink = viewChild<ElementRef<HTMLAnchorElement>>('firstLink');
  private ticking = false;

  /** "Resultados" só aparece se a seção existir (há resultados reais ou placeholders ligados). */
  protected readonly nav: NavItem[] = [
    { id: 'sobre', label: 'O Studio' },
    { id: 'servicos', label: 'Mega Hair' },
    ...(RESULTS.length > 0 || SITE.showPlaceholders ? [{ id: 'resultados', label: 'Resultados' }] : []),
    { id: 'contato', label: 'Contato' },
  ];

  constructor() {
    // trava o scroll da página com o menu aberto e leva o foco para o primeiro link
    effect(() => {
      const open = this.menuOpen();
      document.documentElement.classList.toggle('menu-open', open);
      if (open) queueMicrotask(() => this.firstLink()?.nativeElement.focus());
    });
    this.onScroll();
  }

  protected onScroll(): void {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      this.ticking = false;
      this.scrolled.set(window.scrollY > 24);

      // seção ativa = a última cujo topo já passou da altura do header (nenhuma enquanto está na hero)
      const line = 140;
      let current = '';
      for (const item of this.nav) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= line) current = item.id;
      }
      this.active.set(current);
    });
  }

  protected toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  protected closeMenu(): void {
    if (this.menuOpen()) this.menuOpen.set(false);
  }
}
