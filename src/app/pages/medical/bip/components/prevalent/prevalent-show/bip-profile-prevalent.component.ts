import { Component } from '@angular/core';
import { PrevalentSettingEventAndAntecedent } from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-prevalent-show',
  templateUrl: './bip-profile-prevalent.component.html',
  styleUrls: ['./bip-profile-prevalent.component.scss'],
})
export class BipProfilePrevalentComponent extends InputDirective<
  PrevalentSettingEventAndAntecedent[]
> {}
