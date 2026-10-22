import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Reveal } from '../../core/reveal';
import { SITE } from '../../core/site.config';
import { hasWhatsapp, whatsappUrl } from '../../core/whatsapp';

interface Row {
  label: string;
  /** conteúdo real (vazio = ainda não informado) */
  lines: string[];
  href?: string;
  external?: boolean;
  /** texto do placeholder, mostrado só com showPlaceholders */
  todo: string;
}

/** 5581999998888 -> (81) 99999-8888 */
function formatPhone(raw: string): string {
  let d = raw.replace(/\D/g, '');
  if (d.startsWith('55') && d.length >= 12) d = d.slice(2);
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return raw;
}

@Component({
  selector: 'smm-contact',
  imports: [Reveal],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly copy = SITE.contactSection;
  protected readonly wa = whatsappUrl();
  protected readonly hasWa = hasWhatsapp();
  protected readonly showPlaceholders = SITE.showPlaceholders;

  protected readonly rows: Row[];
  protected readonly mapUrl: SafeResourceUrl | null;

  constructor() {
    const c = SITE.contact;
    const sanitizer = inject(DomSanitizer);

    const all: Row[] = [
      {
        label: 'WhatsApp',
        lines: c.whatsapp ? [formatPhone(c.whatsapp)] : [],
        href: this.hasWa ? this.wa : undefined,
        external: true,
        todo: 'Falta o número do WhatsApp',
      },
      {
        label: 'Instagram',
        lines: c.instagram ? [`@${c.instagram}`] : [],
        href: c.instagram ? `https://instagram.com/${c.instagram}` : undefined,
        external: true,
        todo: 'Falta o @ do Instagram',
      },
      {
        label: 'Endereço',
        lines: c.addressLines,
        href: c.mapLink || undefined,
        external: true,
        todo: 'Falta o endereço',
      },
      {
        label: 'Horários',
        lines: c.hours.map((h) => `${h.days}: ${h.time}`),
        todo: 'Faltam os dias e horários',
      },
    ];

    this.rows = all.filter((r) => r.lines.length > 0 || SITE.showPlaceholders);
    this.mapUrl = c.mapEmbedUrl ? sanitizer.bypassSecurityTrustResourceUrl(c.mapEmbedUrl) : null;
  }
}
