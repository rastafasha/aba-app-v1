import { Component } from '@angular/core';
import { PrevalentSettingEventAndAntecedent } from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-prevalent-setting',
  templateUrl: './prevalent-setting.component.html',
  styleUrls: ['./prevalent-setting.component.scss'],
})
export class PrevalentSettingComponent extends InputDirective<
  PrevalentSettingEventAndAntecedent[]
> {
  newItem = PrevalentSettingEventAndAntecedent.getDeafult();
}
