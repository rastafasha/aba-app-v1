import { Component, Input } from '@angular/core';
import { GoalV2 } from 'src/app/core/models';

@Component({
  selector: 'app-bip-profile-reductions',
  templateUrl: './bip-profile-reductions.component.html',
  styleUrls: ['./bip-profile-reductions.component.scss'],
})
export class BipProfileReductionsComponent {
  @Input() reduction_goal: GoalV2[];
}
