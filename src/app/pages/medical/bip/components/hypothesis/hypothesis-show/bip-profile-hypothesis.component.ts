import { Component, Input } from '@angular/core';
import {
  Attention,
  BipV2,
  Escape,
  Sensory,
  Tangible,
} from 'src/app/core/models';
import { HeadRender } from 'src/app/shared/components/list/list.component';

@Component({
  selector: 'app-hypothesis-show',
  templateUrl: './bip-profile-hypothesis.component.html',
  styleUrls: ['./bip-profile-hypothesis.component.scss'],
})
export class BipProfileHypothesisComponent {
  @Input() bip: BipV2;
  headRenders: HeadRender<Tangible | Sensory | Escape | Attention> = {
    preventive_strategies: () => 'Preventive Strategies (antecedent-based)',
    replacement_skills: () => 'Replacement Skills (related to function) ',
    manager_strategies: () => 'Management Strategies (consequence-based)',
  };
}
