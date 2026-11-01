import { Strands } from '../../shared/strands';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../../core/site.config';
import { Reveal } from '../../core/reveal';

@Component({
  selector: 'smm-about',
  imports: [Reveal, Strands],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  protected readonly about = SITE.about;
}
