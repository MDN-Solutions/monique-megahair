import { ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core';
import { SITE } from '../../core/site.config';
import { Reveal } from '../../core/reveal';
import { Icon } from '../../shared/icon';

@Component({
  selector: 'smm-about',
  imports: [Reveal, Icon],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  protected readonly about = SITE.about;
  protected readonly film = SITE.film;

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('filmDialog');
  private readonly video = viewChild.required<ElementRef<HTMLVideoElement>>('filmVideo');

  /** O arquivo (9 MB) só é baixado quando a pessoa pede para assistir. */
  protected openFilm(): void {
    const video = this.video().nativeElement;
    if (!video.getAttribute('src')) video.src = this.film.src;
    this.dialog().nativeElement.showModal();
    video.play().catch(() => {
      /* o usuário pode apertar play nos controles */
    });
  }

  protected closeFilm(): void {
    this.dialog().nativeElement.close();
  }

  /** Ao fechar (botão, Esc ou clique no fundo): para o vídeo e libera a conexão. */
  protected onFilmClosed(): void {
    const video = this.video().nativeElement;
    video.pause();
    video.removeAttribute('src');
    video.load();
  }

  /** Clique no fundo escurecido (::backdrop) fecha o diálogo. */
  protected onDialogClick(event: MouseEvent): void {
    if (event.target === this.dialog().nativeElement) this.closeFilm();
  }
}
