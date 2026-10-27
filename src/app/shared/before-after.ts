import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, input, signal } from '@angular/core';
import type { ImageRef } from '../core/site.config';

/**
 * Comparador antes/depois: arraste o divisor (mouse/toque) ou use as setas do teclado.
 * Sem imagens, mostra painéis de placeholder identificados (nunca imagem ilustrativa).
 */
@Component({
  selector: 'smm-before-after',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[style.--pos]': "pos() + '%'", '[class.is-dragging]': 'active()', '[class.is-hinted]': 'hinted()' },
  template: `
    <div
      class="ba"
      role="group"
      aria-label="Comparação de antes e depois"
      (pointerdown)="down($event)"
      (pointermove)="move($event)"
      (pointerup)="up($event)"
      (pointercancel)="up($event)"
    >
      <div class="ba__layer">
        @if (after(); as img) {
          <img [src]="img.src" [alt]="img.alt" loading="lazy" decoding="async" draggable="false" />
        } @else {
          <div class="ba__ph ba__ph--after"><span>Foto do depois</span></div>
        }
      </div>
      <div class="ba__layer ba__layer--before">
        @if (before(); as img) {
          <img [src]="img.src" [alt]="img.alt" loading="lazy" decoding="async" draggable="false" />
        } @else {
          <div class="ba__ph ba__ph--before"><span>Foto do antes</span></div>
        }
      </div>

      <span class="ba__tag ba__tag--before" [class.is-dim]="pos() < 22">Antes</span>
      <span class="ba__tag ba__tag--after" [class.is-dim]="pos() > 78">Depois</span>

      <button
        type="button"
        class="ba__handle"
        role="slider"
        aria-label="Arraste para comparar antes e depois"
        aria-valuemin="0"
        aria-valuemax="100"
        [attr.aria-valuenow]="pos()"
        (keydown)="key($event)"
      >
        <span class="ba__grip" aria-hidden="true">
          <svg viewBox="0 0 24 12" width="24" height="12" fill="none" stroke="currentColor" stroke-width="1.25">
            <path d="M8 2 3 6l5 4M16 2l5 4-5 4" />
          </svg>
        </span>
      </button>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .ba {
      position: relative;
      aspect-ratio: 3 / 5;
      overflow: hidden;
      border-radius: var(--radius);
      user-select: none;
      touch-action: pan-y;
      cursor: ew-resize;
      background: var(--c-champagne);
      box-shadow: var(--shadow);
    }
    .ba__layer {
      position: absolute;
      inset: 0;
    }
    .ba__layer img {
      transform: scale(1.02);
      transition: transform 1.2s var(--ease);
    }
    .ba:hover .ba__layer img {
      transform: scale(1.06);
    }
    .ba__layer--before {
      clip-path: inset(0 calc(100% - var(--pos)) 0 0);
    }
    .ba__layer img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 0;
      pointer-events: none;
    }
    .ba__ph {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      padding: 1rem;
      text-align: center;
      font-size: 0.75rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--c-gold-text);
      border: 1px dashed var(--c-gold);
      background:
        url('/brand/monogram.svg') center 38% / 28% no-repeat,
        var(--c-blush);
    }
    .ba__ph--after {
      padding-left: 50%;
      background-color: #f6ecd8;
    }
    .ba__ph--before {
      padding-right: 50%;
    }
    .ba__ph span {
      align-self: end;
      margin-bottom: 18%;
    }
    .ba__tag {
      position: absolute;
      top: 1rem;
      padding: 0.35rem 0.7rem;
      font-size: 0.6875rem;
      font-weight: 500;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      background: rgba(245, 243, 238, 0.94);
      pointer-events: none;
    }
    .ba__tag {
      transition: opacity 0.3s var(--ease);
    }
    .ba__tag.is-dim {
      opacity: 0;
    }
    :host(:not(.is-dragging)) .ba__handle,
    :host(:not(.is-dragging)) .ba__layer--before {
      transition: left 0.45s var(--ease), clip-path 0.45s var(--ease);
    }
    :host(.is-hinted) .ba__handle,
    :host(.is-hinted) .ba__layer--before {
      transition: none !important;
    }
    .ba__grip {
      animation: ba-pulse 2.6s ease-in-out infinite;
    }
    :host(.is-dragging) .ba__grip,
    :host(.is-hinted) .ba__grip {
      animation: none;
      transform: translate(-50%, -50%) scale(1.12);
    }
    @keyframes ba-pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
      50% { box-shadow: 0 0 0 12px rgba(255, 255, 255, 0); }
    }
    @media (prefers-reduced-motion: reduce) {
      .ba__grip { animation: none; }
      .ba__layer img, .ba:hover .ba__layer img { transform: none; transition: none; }
      :host(:not(.is-dragging)) .ba__handle,
      :host(:not(.is-dragging)) .ba__layer--before { transition: none; }
    }
    .ba__tag--before {
      left: 1rem;
    }
    .ba__tag--after {
      right: 1rem;
    }
    .ba__handle {
      position: absolute;
      top: 0;
      bottom: 0;
      left: var(--pos);
      width: 44px;
      margin-left: -22px;
      cursor: ew-resize;
      touch-action: none;
    }
    .ba__handle::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 1px;
      background: var(--c-white);
      box-shadow: 0 0 0 1px rgba(18, 17, 16, 0.12);
    }
    .ba__grip {
      position: absolute;
      top: 38%;
      left: 50%;
      display: grid;
      place-items: center;
      width: 44px;
      height: 44px;
      transform: translate(-50%, -50%);
      color: var(--c-ink);
      background: var(--c-white);
      border-radius: 50%;
      box-shadow: 0 2px 10px rgba(18, 17, 16, 0.25);
    }
    .ba__handle:focus-visible .ba__grip {
      outline: 2px solid var(--c-ink);
      outline-offset: 3px;
    }
  `,
})
export class BeforeAfter {
  readonly before = input<ImageRef | null>(null);
  readonly after = input<ImageRef | null>(null);

  protected readonly pos = signal(50);
  protected readonly active = signal(false);
  protected readonly hinted = signal(false);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private dragging = false;
  private touched = false;
  private raf = 0;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !this.touched) {
            io.disconnect();
            this.sweep();
          }
        },
        { threshold: 0.6 },
      );
      io.observe(this.host);
      destroyRef.onDestroy(() => {
        io.disconnect();
        cancelAnimationFrame(this.raf);
      });
    });
  }

  /** Convite visual: o divisor percorre a foto uma vez ao entrar na tela. Cancelado por qualquer interação. */
  private sweep(): void {
    this.hinted.set(true);
    const start = performance.now();
    const D = 2600;
    const tick = (now: number): void => {
      if (this.touched) return;
      const t = Math.min(1, (now - start) / D);
      const wave = Math.sin(t * Math.PI * 2);
      this.pos.set(Math.round((50 + wave * 38) * 10) / 10);
      if (t < 1) this.raf = requestAnimationFrame(tick);
      else {
        this.pos.set(50);
        this.hinted.set(false);
      }
    };
    this.raf = requestAnimationFrame(tick);
  }

  private interact(): void {
    this.touched = true;
    cancelAnimationFrame(this.raf);
    this.hinted.set(false);
  }

  protected down(e: PointerEvent): void {
    this.interact();
    this.dragging = true;
    this.active.set(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    this.update(e.clientX);
  }

  protected move(e: PointerEvent): void {
    if (this.dragging) this.update(e.clientX);
  }

  protected up(e: PointerEvent): void {
    this.dragging = false;
    this.active.set(false);
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  }

  protected key(e: KeyboardEvent): void {
    this.interact();
    const step = e.shiftKey ? 10 : 4;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') this.set(this.pos() - step);
    else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') this.set(this.pos() + step);
    else if (e.key === 'Home') this.set(0);
    else if (e.key === 'End') this.set(100);
    else return;
    e.preventDefault();
  }

  private update(clientX: number): void {
    const rect = this.host.getBoundingClientRect();
    this.set(((clientX - rect.left) / rect.width) * 100);
  }

  private set(value: number): void {
    this.pos.set(Math.round(Math.min(100, Math.max(0, value)) * 10) / 10);
  }
}
