import { Component, Input } from '@angular/core';
import { DeEscalationTechnique } from 'src/app/core/models';

@Component({
  selector: 'app-bip-profile-de-escalation',
  templateUrl: './bip-profile-de-escalation.component.html',
  styleUrls: ['./bip-profile-de-escalation.component.scss'],
})
export class BipProfileDeEscalationComponent {
  @Input() de_escalation_technique: DeEscalationTechnique[];
}
