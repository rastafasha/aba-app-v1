import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { PlanV2 } from '../models';
import { RepositoryV2Service } from './repository.v2.service';

@Injectable({ providedIn: 'root' })
export class PlansV2Service extends RepositoryV2Service<PlanV2> {
  constructor(protected http: HttpClient) {
    super(http, url_servicios + '/v2/plans');
  }

  transform(data: unknown): PlanV2 {
    if (!data) return null;
    return new PlanV2(data as Partial<PlanV2>);
  }

  override untransform(data: PlanV2): unknown {
    if (data.id === 0) {
      delete data.id;
    }
    delete data.index;
    if (data.baseline_date)
      data.baseline_date = new Date(data.baseline_date)
        .toISOString()
        .split('T')[0] as never;
    console.log(typeof data.baseline_date, data.baseline_date);
    return data;
  }
}
