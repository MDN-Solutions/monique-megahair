import { ChangeDetectionStrategy, Component, ElementRef, effect, inject, untracked, viewChild } from '@angular/core';
import { FilmService } from '../../core/film.service';
import { SITE } from '../../core/site.config';
import { Icon } from '../../shared/icon';

/** Vídeo completo da inauguração em <dialog>. O arquivo (9 MB) só é baixado quando a pessoa pede para assistir. */
@Component({
  selector: 'smm-film',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog
      #dialog
      class="film"
      aria-label="Vídeo da inauguração do Studio Monique Marques"
      (close)="onClosed()"
      (click)="onDialogClick($event)"
    >
      <div class="film__inner">
        <button type="button" class="film__close" (click)="close()" aria-label="Fechar vídeo">
          <smm-icon name="close" style="--icon-size: 1.5rem" />
        </button>
        <video #video class="film__video" controls playsinline preload="none" [attr.poster]="film.poster"></video>
      </div>
    </dialog>
  `,
  styles: `
    .film {
      width: min(94vw, 1100px);
      max-width: none;
      max-height: 92vh;
      padding: 0;
      border: 0;
      background: transparent;
      overflow: visible;

      &::backdrop {
        background: rgba(38, 28, 26, 0.9);
      }
    }
    .film__inner {
      position: relative;
    }
    .film__video {
      width: 100%;
      max-height: 84vh;
      background: #000;
    }
    .film__close {
      position: absolute;
      right: 0;
      top: -56px;
      display: grid;
      place-items: center;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      color: var(--c-ink);
      background: var(--c-paper);
    }
  `,
})
export class Film {
  protected readonly film = SITE.film;
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  private readonly video = viewChild.required<ElementRef<HTMLVideoElement>>('video');

  constructor() {
    const requests = inject(FilmService).requested;
    effect(() => {
      if (requests() > 0) untracked(() => this.open());
    });
  }

  private open(): void {
    const video = this.video().nativeElement;
    if (!video.getAttribute('src')) video.src = this.film.src;
    this.dialog().nativeElement.showModal();
    video.play().catch(() => {
      /* o usuário pode apertar play nos controles */
    });
  }

  protected close(): void {
    this.dialog().nativeElement.close();
  }

  /** Ao fechar (botão, Esc ou clique no fundo): para o vídeo e libera a conexão. */
  protected onClosed(): void {
    const video = this.video().nativeElement;
    video.pause();
    video.removeAttribute('src');
    video.load();
  }

  /** Clique no fundo escurecido (::backdrop) fecha o diálogo. */
  protected onDialogClick(event: MouseEvent): void {
    if (event.target === this.dialog().nativeElement) this.close();
  }
}
