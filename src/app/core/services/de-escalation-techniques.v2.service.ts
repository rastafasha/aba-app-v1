import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { DeEscalationTechnique } from '../models';
import { RepositoryV2Service } from './repository.v2.service';

@Injectable({ providedIn: 'root' })
export class DeEscalationTechniquesV2Service extends RepositoryV2Service<DeEscalationTechnique> {
  constructor(protected http: HttpClient) {
    super(http, url_servicios + '/v2/de-escalation-techniques');
  }

  transform(data: unknown): DeEscalationTechnique {
    if (!data) return null;
    return new DeEscalationTechnique(data as Partial<DeEscalationTechnique>);
  }
}
