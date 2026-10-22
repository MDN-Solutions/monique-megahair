import { Injectable, signal } from '@angular/core';

const SEEN_KEY = 'smm.opening.seen';

function safeGet(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    /* modo privado / storage bloqueado: apenas ignora */
  }
}

/**
 * Estado da abertura cinematográfica.
 *
 * - `active`: o overlay está na tela (conteúdo fica inert, scroll travado).
 * - `ready`: a hero já pode animar a entrada (vira true quando o overlay começa a se desfazer).
 *
 * A abertura NÃO roda quando: já foi vista nesta sessão (a menos que a URL tenha ?abertura),
 * o usuário prefere movimento reduzido, ou está em modo economia de dados / conexão 2G.
 */
@Injectable({ providedIn: 'root' })
export class IntroService {
  readonly active = signal(false);
  readonly ready = signal(true);

  constructor() {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const conn = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const lowData = !!conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? '');
    const forced = new URLSearchParams(location.search).has('abertura');
    const seen = safeGet(SEEN_KEY) === '1';

    const shouldPlay = !reduced && !lowData && (forced || !seen);
    this.active.set(shouldPlay);
    this.ready.set(!shouldPlay);
    this.sync();
  }

  /** A hero pode começar a animar (overlay iniciou a dissolução). */
  markReady(): void {
    this.ready.set(true);
    this.sync();
  }

  /** Abertura terminou (ou foi pulada): libera conteúdo e lembra na sessão. */
  finish(): void {
    this.active.set(false);
    this.ready.set(true);
    safeSet(SEEN_KEY, '1');
    this.sync();
  }

  private sync(): void {
    const root = document.documentElement;
    root.classList.toggle('intro-active', this.active());
    root.classList.toggle('intro-pending', !this.ready());
  }
}
