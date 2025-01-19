import { DatePipe } from '@angular/common';
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
import { AppRoutes } from 'src/app/shared/routes/routes';
@Component({
  selector: 'app-replacement-goal-form',
  templateUrl: './replacement-goal-form.component.html',
  styleUrls: ['./replacement-goal-form.component.scss'],
})
export class ReplacementGoalFormComponent {
  routes = AppRoutes;
  @Input() input: PlanV2;
  @Output() inputChange = new EventEmitter<PlanV2>();
  @Output() save = new EventEmitter<PlanV2>();
  @Output() cancel = new EventEmitter<void>();
  locale = inject(LOCALE_ID);
  renders: ListRender<Objective> = {
    initial_date: (x) =>
      new DatePipe(this.locale).transform(x.initial_date, 'shortDate'),
    end_date: (x) =>
      new DatePipe(this.locale).transform(x.end_date, 'shortDate'),
  };
  stosChange = new EventEmitter<Objective[]>();
  newSto: Objective = { ...Objective.getDefault(), type: 'STO' };
  newLto: Objective = { ...Objective.getDefault(), type: 'LTO' };
  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }
}
