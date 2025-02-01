import { Component } from '@angular/core';
import { Recommendation } from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-service-recomendation-form',
  templateUrl: './service-recomendation-form.component.html',
  styleUrls: ['./service-recomendation-form.component.scss'],
})
export class ServiceRecomendationFormComponent extends InputDirective<Recommendation> {}
