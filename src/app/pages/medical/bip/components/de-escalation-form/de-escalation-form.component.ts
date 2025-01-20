import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeEscalationTechnique } from 'src/app/core/models';

@Component({
  selector: 'app-de-escalation-form',
  templateUrl: './de-escalation-form.component.html',
  styleUrls: ['./de-escalation-form.component.scss'],
})
export class DeEscalationFormComponent {
  @Input() title = '';
  @Input() input: DeEscalationTechnique;
  @Output() inputChange = new EventEmitter<DeEscalationTechnique>();
  @Output() save = new EventEmitter<DeEscalationTechnique>();
  @Output() cancel = new EventEmitter<void>();

  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }

  onCancel() {
    this.cancel.emit();
  }
}
