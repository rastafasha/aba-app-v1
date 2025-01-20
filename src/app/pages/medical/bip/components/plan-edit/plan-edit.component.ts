import { DatePipe, TitleCasePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  LOCALE_ID,
  Output,
} from '@angular/core';
import { Objective, PlanV2 } from 'src/app/core/models';
import { ListRender } from 'src/app/shared/components/list/list.component';

@Component({
  selector: 'app-plan-edit',
  templateUrl: './plan-edit.component.html',
  styleUrls: ['./plan-edit.component.scss'],
})
export class PlanEditComponent {
  @Input() input: PlanV2;
  @Output() inputChange = new EventEmitter<PlanV2>();
  @Output() save = new EventEmitter<PlanV2>();
  @Output() cancel = new EventEmitter<void>();
  //
  @Input() title = 'Plan';
  //
  displayedColumns: (keyof Objective)[] = [
    'description',
    'target',
    'status',
    'initial_date',
    'end_date',
  ];
  newSto: Objective = { ...Objective.getDefault(), type: 'STO' };
  newLto: Objective = { ...Objective.getDefault(), type: 'LTO' };
  //
  private locale = inject(LOCALE_ID);
  private datePipe = new DatePipe(this.locale);
  private titlePipe = new TitleCasePipe();
  renders: ListRender<Objective> = {
    status: (x) => this.titlePipe.transform(x.status),
    initial_date: (x) => this.datePipe.transform(x.initial_date, 'shortDate'),
    end_date: (x) => this.datePipe.transform(x.end_date, 'shortDate'),
  };
  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }
  onCancel() {
    this.cancel.emit();
  }
}
