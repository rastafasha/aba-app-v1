import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConsentToTreatment } from 'src/app/core/models';

@Component({
  selector: 'app-consent-treatment-edit',
  templateUrl: './consent-treatment-edit.component.html',
  styleUrls: ['./consent-treatment-edit.component.scss'],
})
export class ConsentTreatmentEditComponent {
  @Input() input: ConsentToTreatment[];
  @Output() inputChange = new EventEmitter<ConsentToTreatment[]>();
  @Output() save = new EventEmitter<ConsentToTreatment[]>();
  @Output() cancel = new EventEmitter<void>();

  newConsent: ConsentToTreatment = new ConsentToTreatment({});

  displayedColumns: (keyof ConsentToTreatment)[] = [
    'analyst_signature_date',
    'parent_guardian_signature_date',
  ];

  renders = {};

  onCancel() {
    this.cancel.emit();
  }

  onSave() {
    this.save.emit(this.input);
  }
}
