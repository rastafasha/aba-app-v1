import { Component, Input } from '@angular/core';
import { GeneralizationTraining } from 'src/app/core/models';

@Component({
  selector: 'app-bip-profile-generalization',
  templateUrl: './bip-profile-generalization.component.html',
  styleUrls: ['./bip-profile-generalization.component.scss'],
})
export class BipProfileGeneralizationComponent {
  @Input() generalization_training: GeneralizationTraining;
}
