import { Component } from '@angular/core';
import { ConsentToTreatment, PLAN_CONST } from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-consent-treatment-show',
  templateUrl: './bip-profile-consent.component.html',
  styleUrls: ['./bip-profile-consent.component.scss'],
})
export class BipProfileConsentComponent extends InputDirective<ConsentToTreatment> {
  consent = PLAN_CONST.CONSENT;
  imagenSerUrl = environment.url_media;
}
