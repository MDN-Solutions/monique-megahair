import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * Traço feito "à mão" sob uma palavra (referência: sublinhado do GESTWŁOSY).
 * Uso: <smm-scribble>Mega Hair</smm-scribble>
 * O traço se desenha quando a hero entra (fim da abertura) ou quando o bloco `.reveal` aparece.
 */
@Component({
  selector: 'smm-scribble',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content />
    <svg class="scribble__line" viewBox="0 0 200 24" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M2 15.5C38 9.5 98 5.8 197 8.2" pathLength="1" />
      <path class="scribble__back" d="M30 20.5C78 15.2 132 13.6 186 13.9" pathLength="1" />
    </svg>
  `,
  styles: `
    smm-scribble {
      position: relative;
      display: inline-block;
      white-space: nowrap;
    }
    .scribble__line {
      position: absolute;
      left: -2%;
      bottom: -0.26em;
      width: 104%;
      height: 0.34em;
      overflow: visible;
      pointer-events: none;
    }
    .scribble__line path {
      fill: none;
      stroke: var(--c-berry);
      stroke-width: 2.4px;
      stroke-linecap: round;
      vector-effect: non-scaling-stroke;
      stroke-dasharray: 1;
      stroke-dashoffset: 0;
      transition: stroke-dashoffset 0.7s cubic-bezier(0.65, 0, 0.35, 1) 0.5s;
    }
    .scribble__line .scribble__back {
      stroke-width: 1.6px;
      transition-delay: 1.05s;
      transition-duration: 0.45s;
    }
    html.intro-pending smm-scribble path,
    .reveal:not(.is-visible) smm-scribble path {
      stroke-dashoffset: 1;
      transition: none;
    }
    @media (prefers-reduced-motion: reduce) {
      .scribble__line path {
        transition: none;
      }
      html.intro-pending smm-scribble path,
      .reveal:not(.is-visible) smm-scribble path {
        stroke-dashoffset: 0;
      }
    }
  `,
})
export class Scribble {}
