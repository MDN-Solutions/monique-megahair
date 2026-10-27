import { Strands } from '../../shared/strands';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../../core/reveal';
import { RESULTS, SITE } from '../../core/site.config';
import { BeforeAfter } from '../../shared/before-after';

@Component({
  selector: 'smm-results',
  imports: [Reveal, BeforeAfter, Strands],
  templateUrl: './results.html',
  styleUrl: './results.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Results {
  protected readonly copy = SITE.results;
  protected readonly items = RESULTS;

  /** Sem fotos reais fornecidas, a seção só existe como placeholder identificado (ou some). */
  protected readonly showPlaceholder = RESULTS.length === 0 && SITE.showPlaceholders;
  protected readonly visible = RESULTS.length > 0 || SITE.showPlaceholders;
}
