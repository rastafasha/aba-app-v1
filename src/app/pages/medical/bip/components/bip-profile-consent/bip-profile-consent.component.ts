import { Component, Input } from '@angular/core';
import { ConsentToTreatment } from 'src/app/core/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bip-profile-consent',
  templateUrl: './bip-profile-consent.component.html',
  styleUrls: ['./bip-profile-consent.component.scss'],
})
export class BipProfileConsentComponent {
  @Input() consent_to_treatment: ConsentToTreatment;
  imagenSerUrl = environment.url_media;
}
