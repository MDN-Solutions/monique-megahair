import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Reveal } from '../../core/reveal';
import { HAS_CONTACT, SITE } from '../../core/site.config';
import { formatPhone, hasWhatsapp, instagramUrl, whatsappUrl } from '../../core/whatsapp';
import { Icon, IconName } from '../../shared/icon';

interface Row {
  icon: IconName;
  label: string;
  /** conteúdo real (vazio = ainda não informado) */
  lines: string[];
  href?: string;
  /** link extra abaixo do conteúdo (ex.: "Como chegar") */
  action?: { label: string; href: string };
  /** texto do placeholder, mostrado só com showPlaceholders */
  todo: string;
}

/**
 * Contato: botões de WhatsApp e Instagram, canais, endereço com "Como chegar" e o mapa.
 * Linhas sem dado real não aparecem (a menos que showPlaceholders esteja ligado).
 */
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
  protected readonly instagramUrl = instagramUrl();
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
        todo: 'Informar o número do WhatsApp do estúdio',
      },
      {
        icon: 'instagram',
        label: 'Instagram',
        lines: c.instagram ? [`@${c.instagram}`] : [],
        href: this.instagramUrl || undefined,
        todo: 'Informar o usuário do Instagram',
      },
      {
        icon: 'pin',
        label: 'Endereço',
        lines: c.addressLines,
        action: c.mapLink ? { label: this.copy.directions, href: c.mapLink } : undefined,
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
