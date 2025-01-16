import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  GeneralizationTraining,
  TransitionFadingPlan,
} from 'src/app/core/models';

@Component({
  selector: 'app-generalization-training',
  templateUrl: './generalization-training.component.html',
  styleUrls: ['./generalization-training.component.scss'],
})
export class GeneralizationTrainingComponent {
  @Input() generalization: GeneralizationTraining;
  @Output() generalizationChange = new EventEmitter<GeneralizationTraining>();
  @Output() save = new EventEmitter<GeneralizationTraining>();
  //
  newTransitionFadingPlan = TransitionFadingPlan.getDefault();
  //
  text_validation = '';
  //
  onSave() {
    this.generalizationChange.emit(this.generalization);
    this.save.emit(this.generalization);
  }
}
