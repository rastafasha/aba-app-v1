import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CrisisPlanV2 } from 'src/app/core/models';
import { ListAndFormComponent } from 'src/app/shared/components/list-and-form/list-and-form.component';

@Component({
  selector: 'app-crisis-plan',
  templateUrl: './crisis-plan.component.html',
  styleUrls: ['./crisis-plan.component.scss'],
})
export class CrisisPlanComponent {
  @Input() input: CrisisPlanV2[];
  @Output() inputChange = new EventEmitter<CrisisPlanV2[]>();
  @Output() save = new EventEmitter<CrisisPlanV2[]>();

  state: 'list' | 'edit' = 'list';
  newItem: CrisisPlanV2 = CrisisPlanV2.getDefault();

  displayedColumns: (keyof CrisisPlanV2)[] = ['crisis_description'];
  renders = {
    crisis_description: (item: CrisisPlanV2) =>
      item.crisis_description || 'N/A',
  };

  options = [
    {
      text: 'Select',
      icon: 'fa fa-eye',
      class: 'btn btn-outline-primary btn-sm',
      action: (item: CrisisPlanV2) => this.onSelect(item),
    },
    {
      text: 'Delete',
      icon: 'fa fa-trash-alt',
      class: 'btn btn-outline-danger btn-sm',
      action: (item: CrisisPlanV2, context: never) =>
        this.onDelete(item, context),
    },
  ];
  onSelect(item: CrisisPlanV2) {
    this.newItem = { ...item };
    this.state = 'edit';
  }

  onDelete(item: CrisisPlanV2, context: ListAndFormComponent<CrisisPlanV2>) {
    context.onDelete(item);
  }

  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }
  onBack() {
    this.state = 'list';
  }
}
