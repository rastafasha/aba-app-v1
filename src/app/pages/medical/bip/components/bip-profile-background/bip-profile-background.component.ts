import { Component, Input } from '@angular/core';
import { BipV2, TYPE_OF_ASSESSMENT_MAP } from 'src/app/core/models';

@Component({
  selector: 'app-bip-profile-background',
  templateUrl: './bip-profile-background.component.html',
  styleUrls: ['./bip-profile-background.component.scss'],
})
export class BipProfileBackgroundComponent {
  @Input() bip: BipV2;
  assessments_types = TYPE_OF_ASSESSMENT_MAP;
}
