import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { Objective } from '../models';
import { RepositoryV2Service } from './repository.v2.service';

@Injectable({ providedIn: 'root' })
export class ObjectivesV2Service extends RepositoryV2Service<Objective> {
  constructor(protected http: HttpClient) {
    super(http, url_servicios + '/v2/objectives');
  }

  transform(data: unknown): Objective {
    if (!data) return null;
    return new Objective(data as Partial<Objective>);
  }

  override untransform(data: Objective): unknown {
    const formattedData = { ...data };
    if (formattedData.initial_date) {
      formattedData.initial_date = new Date(formattedData.initial_date)
        .toISOString()
        .split('T')[0] as never;
    }
    if (formattedData.end_date) {
      formattedData.end_date = new Date(formattedData.end_date)
        .toISOString()
        .split('T')[0] as never;
    }
    return formattedData;
  }
}
