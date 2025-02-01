import { Component } from '@angular/core';
import { BipV2 } from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-bip-profile-assestment',
  templateUrl: './bip-profile-assestment.component.html',
  styleUrls: ['./bip-profile-assestment.component.scss'],
})
export class BipProfileAssestmentComponent extends InputDirective<BipV2> {}
