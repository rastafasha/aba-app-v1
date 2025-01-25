import { Component } from '@angular/core';
import {
  Attention,
  BipV2,
  Escape,
  Sensory,
  Tangible,
} from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-hypothesis-based-interventions',
  templateUrl: './hypothesis-based-interventions.component.html',
  styleUrls: ['./hypothesis-based-interventions.component.scss'],
})
export class HypothesisBasedInterventionsComponent extends InputDirective<BipV2> {
  newTangible: Tangible = Tangible.getDefault();
  newSensory: Sensory = Sensory.getDefault();
  newEscape: Escape = Escape.getDefault();
  newAttention: Attention = Attention.getDefault();
}
