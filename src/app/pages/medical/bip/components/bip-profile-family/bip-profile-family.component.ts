import { Component, Input } from '@angular/core';
import { GoalV2 } from 'src/app/core/models';

@Component({
  selector: 'app-bip-profile-family',
  templateUrl: './bip-profile-family.component.html',
  styleUrls: ['./bip-profile-family.component.scss'],
})
export class BipProfileFamilyComponent {
  @Input() family_envolment: GoalV2[];
}
