import { Component } from '@angular/core';
import { BipV2, Medication, TYPE_OF_ASSESSMENT_MAP } from 'src/app/core/models';
import { HeadRender } from 'src/app/shared/components/list/list.component';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-bip-profile-background',
  templateUrl: './bip-profile-background.component.html',
  styleUrls: ['./bip-profile-background.component.scss'],
})
export class BipProfileBackgroundComponent extends InputDirective<BipV2> {
  assessments_types = TYPE_OF_ASSESSMENT_MAP;
  headRenders: HeadRender<Medication> = {
    preescribing_physician: () => 'Prescription Physician',
  };
}
