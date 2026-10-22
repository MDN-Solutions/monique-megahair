import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Revela o elemento quando ele entra na tela (uma única vez).
 * Uso: <section class="reveal" smmReveal> — o CSS de `.reveal` esconde até `.is-visible`.
 * Sem IntersectionObserver (ou com movimento reduzido), o elemento já nasce visível.
 */
@Directive({ selector: '[smmReveal]' })
export class Reveal implements OnInit, OnDestroy {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      this.el.classList.add('is-visible');
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          this.el.classList.add('is-visible');
          this.observer?.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    );
    this.observer.observe(this.el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
