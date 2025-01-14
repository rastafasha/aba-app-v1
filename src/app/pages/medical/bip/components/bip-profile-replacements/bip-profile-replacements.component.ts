import { Component, Input } from '@angular/core';
import { BipV2 } from 'src/app/core/models';

@Component({
  selector: 'app-bip-profile-replacements',
  templateUrl: './bip-profile-replacements.component.html',
  styleUrls: ['./bip-profile-replacements.component.scss'],
})
export class BipProfileReplacementsComponent {
  @Input() bip: BipV2;
}
