import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Medication } from 'src/app/core/models';

@Component({
  selector: 'app-phisical-and-medical',
  templateUrl: './phisical_and_medical.component.html',
  styleUrls: ['./phisical_and_medical.component.scss'],
})
export class PhisicalAndMedicalComponent {
  @Input() input: Medication;
  @Output() inputChange = new EventEmitter<Medication>();
  @Output() save = new EventEmitter<Medication>();
  @Output() cancel = new EventEmitter<void>();

  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }
  onCancel() {
    this.cancel.emit();
  }
}
