import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName =
  | 'arrow'
  | 'whatsapp'
  | 'instagram'
  | 'pin'
  | 'clock'
  | 'menu'
  | 'close'
  | 'play';

/** Ícones de traço (1.5px), decorativos: o texto ao lado sempre carrega o significado. */
@Component({
  selector: 'smm-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      width="100%"
      height="100%"
    >
      @switch (name()) {
        @case ('arrow') {
          <path d="M7 17 17 7M8.5 7H17v8.5" />
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
