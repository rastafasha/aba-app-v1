import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bip-profile-generalization',
  templateUrl: './bip-profile-generalization.component.html',
  styleUrls: ['./bip-profile-generalization.component.scss'],
})
export class BipProfileGeneralizationComponent {
  @Input() input: string;
}
