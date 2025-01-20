import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CrisisPlan } from 'src/app/core/models';
import { ListAndFormComponent } from 'src/app/shared/components/list-and-form/list-and-form.component';

@Component({
  selector: 'app-crisis-plan',
  templateUrl: './crisis-plan.component.html',
  styleUrls: ['./crisis-plan.component.scss'],
})
export class CrisisPlanComponent {
  @Input() input: CrisisPlan[];
  @Output() inputChange = new EventEmitter<CrisisPlan[]>();
  @Output() save = new EventEmitter<CrisisPlan[]>();

  state: 'list' | 'edit' = 'list';
  newItem: CrisisPlan = CrisisPlan.getDefault();

  displayedColumns: (keyof CrisisPlan)[] = ['crisis_description'];
  renders = {
    crisis_description: (item: CrisisPlan) => item.crisis_description || 'N/A',
  };

  options = [
    {
      text: 'Select',
      icon: 'fa fa-eye',
      class: 'btn btn-outline-primary btn-sm',
      action: (item: CrisisPlan) => this.onSelect(item),
    },
    {
      text: 'Delete',
      icon: 'fa fa-trash-alt',
      class: 'btn btn-outline-danger btn-sm',
      action: (item: CrisisPlan, context: never) =>
        this.onDelete(item, context),
    },
  ];
  onSelect(item: CrisisPlan) {
    this.newItem = { ...item };
    this.state = 'edit';
  }

  onDelete(item: CrisisPlan, context: ListAndFormComponent<CrisisPlan>) {
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
