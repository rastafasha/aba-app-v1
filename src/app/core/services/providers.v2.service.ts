import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { ProviderV2 } from '../models';
import { RepositoryV2Service } from './repository.v2.service';

@Injectable({ providedIn: 'root' })
export class ProviderV2Service extends RepositoryV2Service<ProviderV2> {
  constructor(protected http: HttpClient) {
    super(http, url_servicios + '/v2/users');
  }
  transform(data: unknown): ProviderV2 {
    return new ProviderV2(data);
  }
}
