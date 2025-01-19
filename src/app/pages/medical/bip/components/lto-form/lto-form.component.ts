import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Objective } from 'src/app/core/models';

@Component({
  selector: 'app-lto-form',
  templateUrl: './lto-form.component.html',
  styleUrls: ['./lto-form.component.scss'],
})
export class LtoFormComponent {
  @Input() input: Objective;
  @Output() inputChange = new EventEmitter<Objective>();
  @Output() save = new EventEmitter<Objective>();

  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }
}
