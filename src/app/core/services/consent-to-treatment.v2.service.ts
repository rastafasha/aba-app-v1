import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { ConsentToTreatment } from '../models';
import { RepositoryV2Service } from './repository.v2.service';

@Injectable({ providedIn: 'root' })
export class ConsentToTreatmentV2Service extends RepositoryV2Service<ConsentToTreatment> {
  constructor(protected http: HttpClient) {
    super(http, url_servicios + '/v2/consent-to-treatments');
  }

  transform(response: unknown): ConsentToTreatment {
    if (!response) return null;
    return new ConsentToTreatment(response as object);
  }
}
