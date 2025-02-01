import { Component } from '@angular/core';
import { DeEscalationTechnique } from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-bip-profile-de-escalation',
  templateUrl: './bip-profile-de-escalation.component.html',
  styleUrls: ['./bip-profile-de-escalation.component.scss'],
})
export class BipProfileDeEscalationComponent extends InputDirective<
  DeEscalationTechnique[]
> {}
