import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../../core/site.config';
import { hasWhatsapp, whatsappUrl } from '../../core/whatsapp';

@Component({
  selector: 'smm-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  protected readonly hero = SITE.hero;
  protected readonly wa = whatsappUrl();
  protected readonly waExternal = hasWhatsapp();
}
