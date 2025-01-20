import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sensory } from 'src/app/core/models';

@Component({
  selector: 'app-sensory-form',
  templateUrl: './sensory-form.component.html',
  styleUrls: ['./sensory-form.component.scss'],
})
export class SensoryFormComponent {
  @Input() input: Sensory;
  @Output() inputChange = new EventEmitter<Sensory>();
  @Output() save = new EventEmitter<Sensory>();
  @Output() cancel = new EventEmitter<void>();

  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }
  onCancel() {
    this.cancel.emit();
  }
}
