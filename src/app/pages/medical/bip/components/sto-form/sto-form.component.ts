import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Objective, OBJECTIVE_STATUS_MAP } from 'src/app/core/models';

@Component({
  selector: 'app-sto-form',
  templateUrl: './sto-form.component.html',
  styleUrls: ['./sto-form.component.scss'],
})
export class StoFormComponent {
  @Input() input: Objective;
  @Output() inputChange = new EventEmitter<Objective>();
  @Output() save = new EventEmitter<Objective>();
  states = OBJECTIVE_STATUS_MAP;

  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }
}
