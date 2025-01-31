import { Component, Input } from '@angular/core';
import { PlanV2 } from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-bip-profile-reductions',
  templateUrl: './bip-profile-reductions.component.html',
  styleUrls: ['./bip-profile-reductions.component.scss'],
})
export class BipProfileReductionsComponent extends InputDirective<PlanV2[]> {
  @Input() title: string;
  @Input() graphTitle: string;
}
