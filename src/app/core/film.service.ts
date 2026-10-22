import { Injectable, signal } from '@angular/core';

/** Abre o vídeo da inauguração (o diálogo fica em <smm-film>, no App). Chamado pela hero e pela seção Sobre. */
@Injectable({ providedIn: 'root' })
export class FilmService {
  readonly requested = signal(0);

  open(): void {
    this.requested.update((n) => n + 1);
  }
}
