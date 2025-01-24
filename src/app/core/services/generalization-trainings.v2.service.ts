import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { GeneralizationTraining } from '../models';
import { RepositoryV2Service } from './repository.v2.service';

@Injectable({ providedIn: 'root' })
export class GeneralizationTrainingsV2Service extends RepositoryV2Service<GeneralizationTraining> {
  constructor(protected http: HttpClient) {
    super(http, url_servicios + '/v2/generalization-trainings');
  }

  transform(data: unknown): GeneralizationTraining {
    if (!data) return null;
    return new GeneralizationTraining(data as Partial<GeneralizationTraining>);
  }
}
