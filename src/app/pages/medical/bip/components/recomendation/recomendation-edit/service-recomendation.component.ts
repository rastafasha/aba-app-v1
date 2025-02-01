import { Component } from '@angular/core';
import { Recommendation } from 'src/app/core/models';
import { ListRender } from 'src/app/shared/components/list/list.component';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-service-recomendation-edit',
  templateUrl: './service-recomendation.component.html',
  styleUrls: ['./service-recomendation.component.scss'],
})
export class ServiceRecomendationComponent extends InputDirective<
  Recommendation[]
> {
  newItem = Recommendation.getDefault();
  renders: ListRender<Recommendation> = {};
}
