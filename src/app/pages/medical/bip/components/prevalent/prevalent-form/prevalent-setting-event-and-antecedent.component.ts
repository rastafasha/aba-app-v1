import { Component } from '@angular/core';
import { PrevalentSettingEventAndAntecedent } from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-prevalent-setting-event-and-antecedent',
  templateUrl: './prevalent-setting-event-and-antecedent.component.html',
  styleUrls: ['./prevalent-setting-event-and-antecedent.component.scss'],
})
export class PrevalentSettingEventAndAntecedentComponent extends InputDirective<PrevalentSettingEventAndAntecedent> {}
