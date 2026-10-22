import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FilmService } from '../../core/film.service';
import { SITE } from '../../core/site.config';
import { hasWhatsapp, whatsappUrl } from '../../core/whatsapp';
import { Icon } from '../../shared/icon';
import { Scribble } from '../../shared/scribble';

@Component({
  selector: 'smm-hero',
  imports: [Icon, Scribble],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  private readonly filmService = inject(FilmService);

  protected readonly hero = SITE.hero;
  protected readonly film = SITE.film;
  protected readonly city = SITE.contact.city;
  protected readonly wa = whatsappUrl();
  protected readonly waExternal = hasWhatsapp();

  protected openFilm(): void {
    this.filmService.open();
  }
}
