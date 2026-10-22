import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../../core/reveal';
import { DIFFERENTIALS, DIFFERENTIAL_PLACEHOLDERS, SERVICES, SERVICE_PLACEHOLDERS, SITE, Service } from '../../core/site.config';
import { hasWhatsapp, whatsappUrl } from '../../core/whatsapp';
import { Icon } from '../../shared/icon';

/**
 * O primeiro serviço confirmado é o destaque (foto + texto). Os demais confirmados viram linhas em
 * "Outros serviços"; diferenciais e serviços ainda não confirmados aparecem como tags tracejadas.
 */
@Component({
  selector: 'smm-services',
  imports: [Reveal, Icon],
  templateUrl: './services.html',
  styleUrl: './services.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Services {
  protected readonly copy = SITE.services;
  protected readonly waExternal = hasWhatsapp();

  protected readonly feature: Service = SERVICES[0];
  protected readonly others: Service[] = SERVICES.slice(1);
  protected readonly differentials = DIFFERENTIALS;
  protected readonly differentialTodos = SITE.showPlaceholders ? DIFFERENTIAL_PLACEHOLDERS : [];
  protected readonly serviceTodos = SITE.showPlaceholders ? SERVICE_PLACEHOLDERS : [];
  protected readonly hasTodos = this.differentialTodos.length + this.serviceTodos.length > 0;

  protected link(s: Service): string {
    return whatsappUrl(`Oi! Vi o site do Studio Monique Marques e queria saber mais sobre ${s.title}.`);
  }
}
