import { Component } from '@angular/core';
import {
  Attention,
  BipV2,
  Escape,
  Sensory,
  Tangible,
} from 'src/app/core/models';
import { HeadRender } from 'src/app/shared/components/list/list.component';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-hypothesis-edit',
  templateUrl: './hypothesis-based-interventions.component.html',
  styleUrls: ['./hypothesis-based-interventions.component.scss'],
})
export class HypothesisBasedInterventionsComponent extends InputDirective<BipV2> {
  newTangible: Tangible = Tangible.getDefault();
  newSensory: Sensory = Sensory.getDefault();
  newEscape: Escape = Escape.getDefault();
  newAttention: Attention = Attention.getDefault();

  headRenders: HeadRender<Tangible | Sensory | Escape | Attention> = {
    preventive_strategies: () => 'Preventive Strategies (antecedent-based)',
    replacement_skills: () => 'Replacement Skills (related to function) ',
    manager_strategies: () => 'Management Strategies (consequence-based)',
  };
}
