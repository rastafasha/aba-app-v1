import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Intervention } from 'src/app/core/models';

@Component({
  selector: 'app-intervention-form',
  templateUrl: './intervention-form.component.html',
  styleUrls: ['./intervention-form.component.scss'],
})
export class InterventionFormComponent {
  @Input() input: Intervention;
  @Output() inputChange = new EventEmitter<Intervention>();
  @Output() save = new EventEmitter<Intervention>();
  @Output() cancel = new EventEmitter<void>();

  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }
  onCancel() {
    this.cancel.emit();
  }
}
