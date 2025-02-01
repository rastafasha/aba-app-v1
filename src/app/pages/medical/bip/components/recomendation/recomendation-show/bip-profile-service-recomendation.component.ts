import { Component } from '@angular/core';
import { PLAN_CONST, Recommendation } from 'src/app/core/models';
import {
  HeadRender,
  ListRender,
} from 'src/app/shared/components/list/list.component';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-service-recomendation-show',
  templateUrl: './bip-profile-service-recomendation.component.html',
  styleUrls: ['./bip-profile-service-recomendation.component.scss'],
})
export class BipProfileServiceRecomendationComponent extends InputDirective<
  Recommendation[]
> {
  renders: ListRender<Recommendation> = {
    num_units: (item) => item.num_units + ' units',
  };
  headRenders: HeadRender<Recommendation> = {
    cpt: () => 'CPT',
    description_service: () => 'Description of service',
    num_units: () => '# of units/ 6 months period',
    breakdown_per_week: () => 'Breakdown per week',
    location: () => 'Location (Where services are to be delivered)',
  };
  advice = PLAN_CONST.SERVICE_RECOMMENDATION_ADVICE;
}
