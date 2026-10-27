import { Strands } from '../../shared/strands';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../../core/reveal';
import { SERVICES, SERVICE_PLACEHOLDERS, SITE, Service } from '../../core/site.config';
import { hasWhatsapp, whatsappUrl } from '../../core/whatsapp';

@Component({
  selector: 'smm-services',
  imports: [Reveal, Strands],
  templateUrl: './services.html',
  styleUrl: './services.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Services {
  protected readonly copy = SITE.services;
  protected readonly waExternal = hasWhatsapp();

  protected readonly items: Service[] = SITE.showPlaceholders ? [...SERVICES, ...SERVICE_PLACEHOLDERS] : SERVICES;

  protected isPlaceholder(s: Service): boolean {
    return s.id.startsWith('ph-');
  }

  protected link(s: Service): string {
    return whatsappUrl(`Olá! Vim pelo site do Studio Monique Marques e gostaria de saber mais sobre: ${s.title}.`);
  }
}
