import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Objective, OBJECTIVE_STATUS_MAP } from 'src/app/core/models';

@Component({
  selector: 'app-objective-form',
  templateUrl: './objective-form.component.html',
  styleUrls: ['./objective-form.component.scss'],
})
export class ObjectiveFormComponent {
  @Input() input: Objective;
  @Output() inputChange = new EventEmitter<Objective>();
  @Input() title = 'Objective';
  @Output() save = new EventEmitter<Objective>();
  @Output() cancel = new EventEmitter<void>();
  states = OBJECTIVE_STATUS_MAP;

  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }
  onCancel() {
    this.cancel.emit();
  }
}
