import { Component } from '@angular/core';
import { BipV2 } from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-bip-profile-assestment',
  templateUrl: './assestment-show.component.html',
  styleUrls: ['./assestment-show.component.scss'],
})
export class AssestmentShowComponent extends InputDirective<BipV2> {}
