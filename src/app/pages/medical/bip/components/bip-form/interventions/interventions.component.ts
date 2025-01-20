import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Intervention } from 'src/app/core/models';

@Component({
  selector: 'app-interventions',
  templateUrl: './interventions.component.html',
  styleUrls: ['./interventions.component.scss'],
})
export class InterventionsComponent {
  @Input() input: Intervention[] = [];
  @Output() inputChange = new EventEmitter<Intervention[]>();
  @Output() save = new EventEmitter<Intervention[]>();
  @Output() cancel = new EventEmitter<void>();

  newItem: Intervention = Intervention.getDefault();

  onSave(): void {
    this.save.emit(this.input);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
