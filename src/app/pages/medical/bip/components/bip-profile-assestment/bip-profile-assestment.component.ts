import { Component, Input } from '@angular/core';
import { BipV2 } from 'src/app/core/models';

@Component({
  selector: 'app-bip-profile-assestment',
  templateUrl: './bip-profile-assestment.component.html',
  styleUrls: ['./bip-profile-assestment.component.scss'],
})
export class BipProfileAssestmentComponent {
  @Input() bip: BipV2;
}
