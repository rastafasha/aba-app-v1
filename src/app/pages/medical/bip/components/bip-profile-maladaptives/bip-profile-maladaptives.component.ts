import { Component, Input } from '@angular/core';
import { PlanV2 } from 'src/app/core/models';
import {
  HeadRender,
  KeyOf,
  ListRender,
} from 'src/app/shared/components/list/list.component';

@Component({
  selector: 'app-bip-profile-maladaptives',
  templateUrl: './bip-profile-maladaptives.component.html',
  styleUrls: ['./bip-profile-maladaptives.component.scss'],
})
export class BipProfileMaladaptivesComponent {
  @Input() input: PlanV2[];
  displayedColumns: KeyOf<PlanV2>[] = ['name', 'description', 'baseline_level'];
  renders: ListRender<PlanV2> = {
    baseline_level: (item: PlanV2) => {
      return `Average ${item.current_intensity} occurrences per hour Observed by BCBA`;
    },
  };
  headRenders: HeadRender<PlanV2> = {
    name: () => 'Behavior(s)',
    description: () => 'Topographical Definition',
  };
}
