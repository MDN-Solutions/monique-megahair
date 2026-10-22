import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName =
  | 'sparkle'
  | 'strand'
  | 'selection'
  | 'droplet'
  | 'whatsapp'
  | 'instagram'
  | 'pin'
  | 'clock'
  | 'menu'
  | 'close'
  | 'play';

/** Ícones de traço fino (1.25px), decorativos: o texto ao lado sempre carrega o significado. */
@Component({
  selector: 'smm-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
      width="100%"
      height="100%"
    >
      @switch (name()) {
        @case ('sparkle') {
          <path d="M12 3.2 13.9 10.1 20.8 12 13.9 13.9 12 20.8 10.1 13.9 3.2 12 10.1 10.1Z" />
        }
        @case ('strand') {
          <path d="M3.5 8.5c2.7-3 5.3 3 8.5 0s5.8 3 8.5 0" />
          <path d="M3.5 15.5c2.7-3 5.3 3 8.5 0s5.8 3 8.5 0" />
        }
        @case ('selection') {
          <circle cx="9" cy="12" r="5.2" />
          <circle cx="15" cy="12" r="5.2" />
        }
        @case ('droplet') {
          <path d="M12 3.4c-2.6 3.1-6 6.7-6 10.4a6 6 0 0 0 12 0c0-3.7-3.4-7.3-6-10.4Z" />
          <path d="M9.2 14.6a2.9 2.9 0 0 0 2.2 2.4" />
        }
        @case ('whatsapp') {
          <path d="M12 3.2a8.8 8.8 0 0 0-7.5 13.4L3.3 20.7l4.2-1.1A8.8 8.8 0 1 0 12 3.2Z" />
          <path d="M9.1 8.6c.2 2.6 2.7 5.2 5.4 5.5l1.2-1.3-1.9-1-.8.8c-.9-.3-2-1.4-2.3-2.3l.8-.8-1-1.9Z" />
        }
        @case ('instagram') {
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="3.9" />
          <circle cx="17.1" cy="6.9" r=".6" fill="currentColor" />
        }
        @case ('pin') {
          <path d="M12 21s-6.6-5.6-6.6-11a6.6 6.6 0 0 1 13.2 0C18.6 15.4 12 21 12 21Z" />
          <circle cx="12" cy="10" r="2.4" />
        }
        @case ('clock') {
          <circle cx="12" cy="12" r="8.6" />
          <path d="M12 7.2V12l3.2 2" />
        }
        @case ('menu') {
          <path d="M4 8h16M4 16h16" />
        }
        @case ('close') {
          <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
        }
        @case ('play') {
          <path d="M8.5 5.8v12.4L18.8 12Z" fill="currentColor" stroke="none" />
        }
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-block;
      width: var(--icon-size, 1.5rem);
      height: var(--icon-size, 1.5rem);
      flex: none;
    }
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
}
