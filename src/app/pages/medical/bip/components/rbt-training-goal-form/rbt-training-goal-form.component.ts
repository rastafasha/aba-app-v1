import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Objective, OBJECTIVE_STATUS_MAP } from 'src/app/core/models';
import { ObjectiveFormComponent } from '../objective/objective-form/objective-form.component';

@Component({
  selector: 'app-rbt-training-goal-form',
  templateUrl: './rbt-training-goal-form.component.html',
  styleUrls: ['./rbt-training-goal-form.component.scss'],
})
export class RbtTrainingGoalFormComponent extends ObjectiveFormComponent {
  @Input() input: Objective;
  @Output() inputChange = new EventEmitter<Objective>();
  @Output() save = new EventEmitter<Objective>();
  status = OBJECTIVE_STATUS_MAP;

  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }
}
