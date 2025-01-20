import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Attention,
  BipV2,
  Escape,
  Sensory,
  Tangible,
} from 'src/app/core/models';

@Component({
  selector: 'app-hypothesis-based-interventions',
  templateUrl: './hypothesis-based-interventions.component.html',
  styleUrls: ['./hypothesis-based-interventions.component.scss'],
})
export class HypothesisBasedInterventionsComponent {
  @Input() input: BipV2;
  @Output() inputChange = new EventEmitter<BipV2>();

  newTangible: Tangible = Tangible.getDefault();
  newSensory: Sensory = Sensory.getDefault();
  newEscape: Escape = Escape.getDefault();
  newAttention: Attention = Attention.getDefault();

  onSave() {
    this.inputChange.emit(this.input);
  }
}
