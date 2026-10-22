import { ChangeDetectionStrategy, Component, ElementRef, inject, input, signal } from '@angular/core';
import type { ImageRef } from '../core/site.config';

/**
 * Comparador antes/depois: arraste o divisor (mouse/toque) ou use as setas do teclado.
 * Sem imagens, mostra painéis de placeholder identificados (nunca imagem ilustrativa).
 */
@Component({
  selector: 'smm-before-after',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[style.--pos]': "pos() + '%'" },
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
          <div class="ba__ph ba__ph--after">Foto do depois</div>
        }
      </div>
      <div class="ba__layer ba__layer--before">
        @if (before(); as img) {
          <img [src]="img.src" [alt]="img.alt" loading="lazy" decoding="async" draggable="false" />
        } @else {
          <div class="ba__ph ba__ph--before">Foto do antes</div>
        }
      </div>

      <span class="ba__tag ba__tag--before">Antes</span>
      <span class="ba__tag ba__tag--after">Depois</span>

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
          <svg viewBox="0 0 24 12" width="24" height="12" fill="none" stroke="currentColor" stroke-width="1.5">
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
      aspect-ratio: 4 / 5;
      overflow: hidden;
      user-select: none;
      touch-action: pan-y;
      cursor: ew-resize;
      background: var(--c-sand);
    }
    .ba__layer {
      position: absolute;
      inset: 0;
    }
    .ba__layer--before {
      clip-path: inset(0 calc(100% - var(--pos)) 0 0);
    }
    .ba__layer img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
    }
    .ba__ph {
      width: 100%;
      height: 100%;
      display: grid;
      align-items: end;
      padding: 1.25rem;
      font-size: var(--t-small);
      color: var(--c-text-2);
      background: var(--c-sand);
    }
    .ba__ph--after {
      justify-items: end;
      background: var(--c-blush);
    }
    .ba__tag {
      position: absolute;
      top: 1rem;
      padding: 0.3rem 0.8rem;
      font-size: var(--t-tiny);
      font-weight: 500;
      border-radius: 999px;
      background: var(--c-white);
      pointer-events: none;
    }
    .ba__tag--before {
      left: 1rem;
    }
    .ba__tag--after {
      right: 1rem;
      color: var(--c-paper);
      background: var(--c-ink);
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
      width: 2px;
      margin-left: -1px;
      background: var(--c-white);
    }
    .ba__grip {
      position: absolute;
      top: 50%;
      left: 50%;
      display: grid;
      place-items: center;
      width: 44px;
      height: 44px;
      transform: translate(-50%, -50%);
      color: var(--c-ink);
      background: var(--c-white);
      border-radius: 50%;
      box-shadow: 0 6px 18px -8px rgba(38, 28, 26, 0.5);
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
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private dragging = false;

  protected down(e: PointerEvent): void {
    this.dragging = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    this.update(e.clientX);
  }

  protected move(e: PointerEvent): void {
    if (this.dragging) this.update(e.clientX);
  }

  protected up(e: PointerEvent): void {
    this.dragging = false;
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  }

  protected key(e: KeyboardEvent): void {
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
