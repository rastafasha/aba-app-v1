import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { CrisisPlanV2 } from '../models';
import { RepositoryV2Service } from './repository.v2.service';

@Injectable({ providedIn: 'root' })
export class CrisisPlansV2Service extends RepositoryV2Service<CrisisPlanV2> {
  constructor(protected http: HttpClient) {
    super(http, url_servicios + '/v2/crisis-plans');
  }

  transform(data: unknown): CrisisPlanV2 {
    if (!data) return null;
    return new CrisisPlanV2(data as Partial<CrisisPlanV2>);
  }
}
