import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { LocationV2 } from '../models';
import { RepositoryV2Service } from './repository.v2.service';

@Injectable({ providedIn: 'root' })
export class LocationsV2Service extends RepositoryV2Service<LocationV2> {
  constructor(protected http: HttpClient) {
    super(http, url_servicios + '/v2/locations');
  }
  transform(data: unknown): LocationV2 {
    return data as LocationV2;
  }
}
