import { Component, Input } from '@angular/core';
import { PrevalentSettingEventAndAntecedent } from 'src/app/core/models';

@Component({
  selector: 'app-prevalent-show',
  templateUrl: './bip-profile-prevalent.component.html',
  styleUrls: ['./bip-profile-prevalent.component.scss'],
})
export class BipProfilePrevalentComponent {
  @Input() input: PrevalentSettingEventAndAntecedent[];
}
