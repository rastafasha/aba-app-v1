import { DatePipe } from '@angular/common';
import {
  Directive,
  EventEmitter,
  inject,
  Input,
  LOCALE_ID,
  Output,
} from '@angular/core';
import { PlanV2 } from 'src/app/core/models';
import { ListAndFormComponent } from 'src/app/shared/components/list-and-form/list-and-form.component';
import { ListRender } from 'src/app/shared/components/list/list.component';
@Directive({
  selector: '[appOnPlansEdit]',
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class OnPlansEdit {
  state: 'list' | 'edit' = 'list';
  @Input() input: PlanV2[];
  @Output() inputChange = new EventEmitter<PlanV2[]>();
  @Output() save = new EventEmitter<PlanV2[]>();

  protected abstract newGoal: PlanV2;

  protected locale = inject(LOCALE_ID);
  protected datePipe = new DatePipe(this.locale);

  renders: ListRender<PlanV2> = {
    baseline_date: (item) =>
      this.datePipe.transform(item.baseline_date, 'shortDate'),
  };

  displayedColumns: (keyof PlanV2)[] = [
    'name',
    'baseline_level',
    'baseline_date',
    'initial_intensity',
    'current_intensity',
    'description',
  ];

  protected defaultOptions = [
    {
      text: 'Select',
      icon: 'fa fa-eye',
      class: 'btn btn-outline-primary btn-sm',
      action: (item: PlanV2) => this.onSelect(item),
    },
    {
      text: 'Delete',
      icon: 'fa fa-trash-alt',
      class: 'btn btn-outline-danger btn-sm',
      action: (item: PlanV2, context: never) => this.onDelete(item, context),
    },
  ];

  onSelect(item: PlanV2) {
    this.newGoal = { ...item };
    this.state = 'edit';
  }

  onDelete(item: PlanV2, context: ListAndFormComponent<PlanV2>) {
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
