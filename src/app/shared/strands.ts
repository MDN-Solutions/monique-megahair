import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../core/reveal';

/**
 * Detalhe decorativo: fios dourados finos, como mechas de cabelo, que se desenham ao entrar na tela.
 * Puramente ornamental (aria-hidden); posicionado pela seção que o usa.
 */
@Component({
  selector: 'smm-strands',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [Reveal],
  host: { 'aria-hidden': 'true', class: 'reveal strands' },
  template: `
    <svg viewBox="0 0 220 640" fill="none" preserveAspectRatio="xMidYMid meet" focusable="false">
      <path pathLength="1" d="M30 0C80 120 -10 220 50 340S120 520 90 640" />
      <path pathLength="1" d="M70 0C120 130 30 240 90 360S160 540 130 640" />
      <path pathLength="1" d="M110 0C160 140 70 250 130 380S200 550 170 640" />
      <path pathLength="1" d="M150 0C200 150 110 260 170 390S240 560 210 640" />
    </svg>
  `,
  styles: `
    :host {
      display: block;
      pointer-events: none;
    }
    svg {
      display: block;
      width: 100%;
      height: 100%;
    }
    path {
      stroke: var(--c-gold);
      stroke-width: 1;
      vector-effect: non-scaling-stroke;
      stroke-linecap: round;
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      opacity: 0.55;
      transition: stroke-dashoffset 3.2s var(--ease);
    }
    path:nth-child(2) { transition-delay: 0.25s; opacity: 0.4; }
    path:nth-child(3) { transition-delay: 0.5s; opacity: 0.3; }
    path:nth-child(4) { transition-delay: 0.75s; opacity: 0.22; }
    :host(.is-visible) path {
      stroke-dashoffset: 0;
    }
    @media (prefers-reduced-motion: reduce) {
      path {
        stroke-dashoffset: 0;
        transition: none;
      }
    }
  `,
})
export class Strands {}
