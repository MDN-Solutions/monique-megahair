import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FilmService } from '../../core/film.service';
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
  protected readonly film = SITE.film;
  protected readonly filmService = inject(FilmService);
  protected readonly wa = whatsappUrl();
  protected readonly waExternal = hasWhatsapp();
}
