import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { inject } from '@angular/core';
import { Reveal } from '../../core/reveal';
import { HAS_CONTACT, SITE } from '../../core/site.config';
import { hasWhatsapp, whatsappUrl } from '../../core/whatsapp';
import { Icon, IconName } from '../../shared/icon';

interface Row {
  icon: IconName;
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
  imports: [Reveal, Icon],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly copy = SITE.contactSection;
  protected readonly wa = whatsappUrl();
  protected readonly hasWa = hasWhatsapp();
  protected readonly showPlaceholders = SITE.showPlaceholders;
  protected readonly visible = HAS_CONTACT;

  protected readonly rows: Row[];
  protected readonly mapUrl: SafeResourceUrl | null;

  constructor() {
    const c = SITE.contact;
    const sanitizer = inject(DomSanitizer);

    const all: Row[] = [
      {
        icon: 'whatsapp',
        label: 'WhatsApp',
        lines: c.whatsapp ? [formatPhone(c.whatsapp)] : [],
        href: this.hasWa ? this.wa : undefined,
        external: true,
        todo: 'Informar o número do WhatsApp do estúdio',
      },
      {
        icon: 'instagram',
        label: 'Instagram',
        lines: c.instagram ? [`@${c.instagram}`] : [],
        href: c.instagram ? `https://instagram.com/${c.instagram}` : undefined,
        external: true,
        todo: 'Informar o usuário do Instagram',
      },
      {
        icon: 'pin',
        label: 'Endereço',
        lines: c.addressLines,
        href: c.mapLink || undefined,
        external: true,
        todo: 'Informar o endereço completo',
      },
      {
        icon: 'clock',
        label: 'Horário de atendimento',
        lines: c.hours.map((h) => `${h.days}: ${h.time}`),
        todo: 'Informar dias e horários de atendimento',
      },
    ];

    this.rows = all.filter((r) => r.lines.length > 0 || SITE.showPlaceholders);
    this.mapUrl = c.mapEmbedUrl ? sanitizer.bypassSecurityTrustResourceUrl(c.mapEmbedUrl) : null;
  }
}
