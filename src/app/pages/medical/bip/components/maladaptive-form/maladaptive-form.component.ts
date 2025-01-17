import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlanV2 } from 'src/app/core/models';

@Component({
  selector: 'app-maladaptive-form',
  templateUrl: './maladaptive-form.component.html',
  styleUrls: ['./maladaptive-form.component.scss'],
})
export class MaladaptiveFormComponent {
  @Input() input: PlanV2;
  @Output() inputChange = new EventEmitter<PlanV2>();
  @Output() save = new EventEmitter<PlanV2>();
  @Output() cancel = new EventEmitter<void>();

  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }
  onCancel() {
    this.cancel.emit();
  }
}
