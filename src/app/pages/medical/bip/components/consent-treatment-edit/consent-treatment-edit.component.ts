import { Component } from '@angular/core';
import { ConsentToTreatment } from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-consent-treatment-edit',
  templateUrl: './consent-treatment-edit.component.html',
  styleUrls: ['./consent-treatment-edit.component.scss'],
})
export class ConsentTreatmentEditComponent extends InputDirective<ConsentToTreatment> {}
