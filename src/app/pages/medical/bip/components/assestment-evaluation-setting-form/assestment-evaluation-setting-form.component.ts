import { Component } from '@angular/core';
import { AssestmentEvaluationSetting } from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-assestment-evaluation-setting-form',
  templateUrl: './assestment-evaluation-setting-form.component.html',
  styleUrls: ['./assestment-evaluation-setting-form.component.scss'],
})
export class AssestmentEvaluationSettingFormComponent extends InputDirective<AssestmentEvaluationSetting> {}
