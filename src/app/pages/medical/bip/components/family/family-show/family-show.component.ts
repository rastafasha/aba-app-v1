import { DatePipe } from '@angular/common';
import { Component, inject, LOCALE_ID } from '@angular/core';
import { Objective, PlanV2 } from 'src/app/core/models';
import {
  HeadRender,
  ListRender,
} from 'src/app/shared/components/list/list.component';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-family-show',
  templateUrl: './family-show.component.html',
  styleUrls: ['./family-show.component.scss'],
})
export class FamilyShowComponent extends InputDirective<PlanV2[]> {
  locale = inject(LOCALE_ID);
  datePipe = new DatePipe(this.locale);

  renders: ListRender<Objective> = {
    target: () => '90% fidelify',
    initial_date: (item) =>
      this.datePipe.transform(item.initial_date, 'MMM YYYY'),
  };
  headRenders: HeadRender<Objective> = {
    name: () => 'Caregiver Goal',
    description: () => 'Outcome measure',
    target: () => 'Criteria',
    initial_date: () => 'Initiation date',
    status: () => 'Current status',
  };
}
