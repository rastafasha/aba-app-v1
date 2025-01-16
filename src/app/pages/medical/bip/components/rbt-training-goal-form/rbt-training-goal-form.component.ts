import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Objective } from 'src/app/core/models';

@Component({
  selector: 'app-rbt-training-goal-form',
  templateUrl: './rbt-training-goal-form.component.html',
  styleUrls: ['./rbt-training-goal-form.component.scss'],
})
export class RbtTrainingGoalFormComponent {
  @Input() input: Objective;
  @Output() inputChange = new EventEmitter<Objective>();
  @Output() save = new EventEmitter<Objective>();

  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }
}
