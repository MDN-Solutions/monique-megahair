import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { IntroService } from '../../core/intro.service';

type Phase = 'logo' | 'film' | 'veil' | 'fade';

/**
 * Marcos do clipe editado (segundos de vídeo; arquivo de 4,42 s).
 *  - matchCut: troca do plano aberto para o close-up das tesouras (reenquadra no celular);
 *  - veil: começa a dissolver para o creme e revelar a página.
 * Se o clipe for reeditado, ajuste só estes números.
 */
const FILM = { matchCut: 1.85, veil: 3.45 } as const;

const LOGO_MS = 1400; // cena 1: marca sobre o creme
const FILM_START_TIMEOUT_MS = 6500; // se o vídeo não iniciar até aqui, segue sem ele
const FILM_MAX_MS = 9000; // trava de segurança total depois que o filme começou
const VEIL_MS = 650; // vídeo -> creme
const FADE_MS = 700; // overlay -> página

/**
 * Abertura: o corte real da fita na inauguração do Studio.
 * Sequência: marca -> vídeo entra em fade -> corte da fita -> dissolve no creme -> hero entra.
 * Pode ser pulada a qualquer momento.
 */
@Component({
  selector: 'smm-opening',
  templateUrl: './opening.html',
  styleUrl: './opening.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'dialog',
    'aria-modal': 'true',
    'aria-label': 'Abertura: inauguração do Studio Monique Marques',
    '[class.is-played]': 'played()',
    '[class.is-veil]': "phase() === 'veil' || phase() === 'fade'",
    '[class.is-fade]': "phase() === 'fade'",
    '[class.is-quick]': 'quick()',
    '(document:keydown.escape)': 'skip()',
  },
})
export class Opening {
  private readonly intro = inject(IntroService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly videoRef = viewChild.required<ElementRef<HTMLVideoElement>>('video');
  private readonly skipRef = viewChild.required<ElementRef<HTMLButtonElement>>('skipBtn');

  protected readonly phase = signal<Phase>('logo');
  protected readonly scene = signal<'wide' | 'close'>('wide');
  /** true depois que o vídeo começou: mantém o vídeo visível e a marca oculta durante o véu. */
  protected readonly played = signal(false);
  protected readonly quick = signal(false);

  /** 1080p em telas largas; 720p no resto (menos dados no celular). */
  protected readonly base = matchMedia('(min-width: 900px)').matches
    ? 'media/opening/opening-1080'
    : 'media/opening/opening-720';

  private logoDone = false;
  private canPlay = false;
  private failed = false;
  private raf = 0;
  private readonly timers = new Set<ReturnType<typeof setTimeout>>();

  constructor() {
    afterNextRender(() => {
      const video = this.videoRef().nativeElement;
      video.muted = true; // exigência de autoplay em todos os navegadores

      // Sem codec utilizável (ou erro de rede): a abertura segue só com a marca.
      const playable =
        video.canPlayType('video/mp4; codecs="avc1.42E01E"') !== '' ||
        video.canPlayType('video/webm; codecs="vp9"') !== '';
      if (!playable) this.failed = true;

      this.skipRef().nativeElement.focus({ preventScroll: true });

      this.later(() => {
        this.logoDone = true;
        this.tryStart();
      }, LOGO_MS);
      this.later(() => {
        if (this.phase() === 'logo') this.toVeil(); // vídeo nunca iniciou
      }, FILM_START_TIMEOUT_MS);
    });

    this.destroyRef.onDestroy(() => {
      cancelAnimationFrame(this.raf);
      this.timers.forEach(clearTimeout);
    });
  }

  protected onCanPlay(): void {
    this.canPlay = true;
    this.tryStart();
  }

  protected onVideoError(): void {
    this.failed = true;
    this.tryStart();
  }

  /** Botão "Pular abertura" / tecla Esc. */
  skip(): void {
    if (this.phase() === 'veil' || this.phase() === 'fade') return;
    this.quick.set(true);
    this.toVeil(true);
  }

  private tryStart(): void {
    if (this.phase() !== 'logo' || !this.logoDone) return;
    if (this.failed) {
      this.toVeil();
      return;
    }
    if (!this.canPlay) return; // espera o canplay (ou o timeout de segurança)

    const video = this.videoRef().nativeElement;
    video
      .play()
      .then(() => {
        if (this.phase() !== 'logo') return;
        this.phase.set('film');
        this.played.set(true);
        this.later(() => this.toVeil(), FILM_MAX_MS);
        this.raf = requestAnimationFrame(this.tick);
      })
      .catch(() => this.toVeil()); // ex.: iOS em modo de baixa energia bloqueia autoplay
  }

  /** Sincroniza efeitos ao tempo real do vídeo (mais preciso que timers). */
  private readonly tick = (): void => {
    const video = this.videoRef().nativeElement;
    const t = video.currentTime;

    if (this.scene() === 'wide' && t >= FILM.matchCut) this.scene.set('close');

    if (t >= FILM.veil || video.ended) {
      this.toVeil();
      return;
    }
    this.raf = requestAnimationFrame(this.tick);
  };

  /** Vídeo -> creme; em seguida o overlay se desfaz e a hero anima. */
  private toVeil(quick = false): void {
    if (this.phase() === 'veil' || this.phase() === 'fade') return;
    cancelAnimationFrame(this.raf);
    this.phase.set('veil');

    this.later(
      () => {
        this.intro.markReady(); // hero começa a entrar por baixo do overlay
        this.phase.set('fade');
        this.later(() => this.done(), quick ? 320 : FADE_MS);
      },
      quick ? 300 : VEIL_MS,
    );
  }

  private done(): void {
    this.videoRef().nativeElement.pause();
    this.intro.finish();
    // devolve o foco ao conteúdo principal; espera o `inert` sair do DOM (próximo render)
    setTimeout(() => document.getElementById('main')?.focus({ preventScroll: true }), 60);
  }

  private later(fn: () => void, ms: number): void {
    const id = setTimeout(() => {
      this.timers.delete(id);
      fn();
    }, ms);
    this.timers.add(id);
  }
}
