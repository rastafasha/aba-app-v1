import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeEscalationTechnique, Recomendation } from 'src/app/core/models';

@Component({
  selector: 'app-de-escalation-edit',
  templateUrl: './de-escalation-edit.component.html',
  styleUrls: ['./de-escalation-edit.component.scss'],
})
export class DeEscalationEditComponent {
  @Input() title = '';
  @Input() input: DeEscalationTechnique;
  @Output() inputChange = new EventEmitter<DeEscalationTechnique>();
  @Output() save = new EventEmitter<DeEscalationTechnique>();
  @Output() cancel = new EventEmitter<void>();

  newRecomendation = Recomendation.getDefault();

  displayedColumns: (keyof Recomendation)[] = [
    'cpt',
    'description_service',
    'num_units',
    'breakdown_per_week',
    'location',
  ];

  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }

  onCancel() {
    this.cancel.emit();
  }
}
