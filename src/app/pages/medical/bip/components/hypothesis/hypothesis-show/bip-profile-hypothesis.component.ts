import { Component, Input } from '@angular/core';
import { BipV2 } from 'src/app/core/models';

@Component({
  selector: 'app-bip-profile-hypothesis',
  templateUrl: './bip-profile-hypothesis.component.html',
  styleUrls: ['./bip-profile-hypothesis.component.scss'],
})
export class BipProfileHypothesisComponent {
  @Input() bip: BipV2;
}
