import { DatePipe } from '@angular/common';
import { Component, inject, Input, LOCALE_ID } from '@angular/core';
import { Objective, PlanV2 } from 'src/app/core/models';
import {
  HeadRender,
  ListRender,
} from 'src/app/shared/components/list/list.component';

@Component({
  selector: 'app-family-show',
  templateUrl: './bip-profile-family.component.html',
  styleUrls: ['./bip-profile-family.component.scss'],
})
export class BipProfileFamilyComponent {
  //We are making the suposition that always come 1 Plan (the family/caregiver plan)
  @Input() input: PlanV2[];

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
