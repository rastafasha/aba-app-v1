import { Component, Input } from '@angular/core';
import { PrevalentSettingEventAndAntecedent } from 'src/app/core/models';

@Component({
  selector: 'app-bip-profile-prevalent',
  templateUrl: './bip-profile-prevalent.component.html',
  styleUrls: ['./bip-profile-prevalent.component.scss'],
})
export class BipProfilePrevalentComponent {
  @Input()
  prevalent_setting_event_and_atecedents: PrevalentSettingEventAndAntecedent[];
}
