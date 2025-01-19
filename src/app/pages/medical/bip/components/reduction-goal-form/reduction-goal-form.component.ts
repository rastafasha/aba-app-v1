import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  LOCALE_ID,
  Output,
} from '@angular/core';
import { PlanV2 } from 'src/app/core/models';
import { ListAndFormComponent } from 'src/app/shared/components/list-and-form/list-and-form.component';
import { ListRender } from 'src/app/shared/components/list/list.component';
@Component({
  selector: 'app-reduction-goal-form',
  templateUrl: './reduction-goal-form.component.html',
  styleUrls: ['./reduction-goal-form.component.scss'],
})
export class ReductionGoalFormComponent {
  state: 'list' | 'edit' | 'viewGraph' = 'list';
  @Input() input: PlanV2[] = [];
  @Output() inputChange = new EventEmitter<PlanV2[]>();
  @Input() patient_identifier: string;

  newMaladaptive: PlanV2 = { ...PlanV2.getDefault(), category: 'maladaptive' };

  private locale = inject(LOCALE_ID);
  private datePipe = new DatePipe(this.locale);
  renders: ListRender<PlanV2> = {
    baseline_date: (item) =>
      this.datePipe.transform(item.baseline_date, 'shortDate'),
  };
  options = [
    {
      text: 'Select',
      icon: 'fa fa-eye',
      class: 'btn btn-outline-primary btn-sm',
      action: (item: PlanV2) => this.onSelect(item),
    },
    {
      text: 'View',
      icon: 'fa fa-bar-chart',
      class: 'btn btn-outline-success btn-sm',
      action: (item: PlanV2) => this.onViewGraph(item),
    },
    {
      text: 'Delete',
      icon: 'fa fa-trash-alt',
      class: 'btn btn-outline-danger btn-sm',
      action: (item: PlanV2, context: never) => this.onDelete(item, context),
    },
  ];

  onSelect(item: PlanV2) {
    this.newMaladaptive = { ...item };
    this.state = 'edit';
  }
  onViewGraph(item: PlanV2) {
    this.newMaladaptive = { ...item };
    this.state = 'viewGraph';
  }
  onDelete(item: PlanV2, context: ListAndFormComponent<PlanV2>) {
    context.onDelete(item);
  }
  onBack() {
    this.state = 'list';
  }
}
