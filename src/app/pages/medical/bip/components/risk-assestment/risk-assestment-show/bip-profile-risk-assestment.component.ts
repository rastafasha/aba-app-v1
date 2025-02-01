import { Component } from '@angular/core';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-bip-profile-risk-assestment',
  templateUrl: './bip-profile-risk-assestment.component.html',
  styleUrls: ['./bip-profile-risk-assestment.component.scss'],
})
export class BipProfileRiskAssestmentComponent extends InputDirective<string> {}
