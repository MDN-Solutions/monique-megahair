import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FilmService } from '../../core/film.service';
import { Reveal } from '../../core/reveal';
import { SITE } from '../../core/site.config';
import { Icon } from '../../shared/icon';

@Component({
  selector: 'smm-about',
  imports: [Reveal, Icon],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  private readonly filmService = inject(FilmService);
  protected readonly about = SITE.about;

  protected openFilm(): void {
    this.filmService.open();
  }
}
