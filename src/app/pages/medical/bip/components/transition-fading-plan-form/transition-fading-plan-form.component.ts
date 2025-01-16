import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TransitionFadingPlan } from 'src/app/core/models';

@Component({
  selector: 'app-transition-fading-plan-form',
  templateUrl: './transition-fading-plan-form.component.html',
  styleUrls: ['./transition-fading-plan-form.component.scss'],
})
export class TransitionFadingPlanFormComponent {
  @Input() input: TransitionFadingPlan;
  @Output() inputChange = new EventEmitter<TransitionFadingPlan>();
  @Output() save = new EventEmitter<TransitionFadingPlan>();

  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }
}
