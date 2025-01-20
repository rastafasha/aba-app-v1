import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeEscalationTechnique } from 'src/app/core/models';
import { ListAndFormComponent } from 'src/app/shared/components/list-and-form/list-and-form.component';

@Component({
  selector: 'app-de-escalation-tecniques',
  templateUrl: './de-escalation-tecniques.component.html',
  styleUrls: ['./de-escalation-tecniques.component.scss'],
})
export class DeEscalationTecniquesComponent {
  state: 'list' | 'edit' = 'list';
  @Input() input: DeEscalationTechnique[];
  @Output() inputChange = new EventEmitter<DeEscalationTechnique[]>();
  @Output() save = new EventEmitter<DeEscalationTechnique[]>();

  newItem = DeEscalationTechnique.getDefault();
  displayedColumns: (keyof DeEscalationTechnique)[] = [
    'description',
    'service_recomendation',
  ];

  options = [
    {
      text: 'Select',
      icon: 'fa fa-eye',
      class: 'btn btn-outline-primary btn-sm',
      action: (item: DeEscalationTechnique) => this.onSelect(item),
    },
    {
      text: 'Delete',
      icon: 'fa fa-trash-alt',
      class: 'btn btn-outline-danger btn-sm',
      action: (item: DeEscalationTechnique, context: never) =>
        this.onDelete(item, context),
    },
  ];
  renders = {};
  onSelect(item: DeEscalationTechnique) {
    this.newItem = { ...item };
    this.state = 'edit';
  }

  onDelete(
    item: DeEscalationTechnique,
    context: ListAndFormComponent<DeEscalationTechnique>
  ) {
    context.onDelete(item);
  }

  onBack() {
    this.state = 'list';
  }

  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }
}
