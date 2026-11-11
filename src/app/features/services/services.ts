import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../../core/reveal';
import { FEATURED_SERVICE, SERVICE_GROUPS, SITE } from '../../core/site.config';
import { whatsappUrl } from '../../core/whatsapp';
import { Icon } from '../../shared/icon';
import { Strands } from '../../shared/strands';

/** Serviços: Mega Hair em destaque (foto + o que inclui) e os demais grupos lado a lado. */
@Component({
  selector: 'smm-services',
  imports: [Reveal, Strands, Icon],
  templateUrl: './services.html',
  styleUrl: './services.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Services {
  protected readonly copy = SITE.services;
  protected readonly featured = FEATURED_SERVICE;
  protected readonly groups = SERVICE_GROUPS;
  protected readonly featuredLink = this.link(FEATURED_SERVICE.title);

  protected link(title: string): string {
    return whatsappUrl(`Olá! Vim pelo site do Studio Monique Marques e gostaria de agendar: ${title}.`);
  }
}
