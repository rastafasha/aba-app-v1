import { Component, Input } from '@angular/core';
import { BipV2 } from 'src/app/core/models';

@Component({
  selector: 'app-bip-profile-behavior',
  templateUrl: './bip-profile-behavior.component.html',
  styleUrls: ['./bip-profile-behavior.component.scss'],
})
export class BipProfileBehaviorComponent {
  @Input() bip: BipV2;
}
