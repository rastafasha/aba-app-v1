import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';

import { RepositoryV2Service } from './repository.v2.service';
import { BipV2 } from '../models/v2/bip.v2.model';

@Injectable({ providedIn: 'root' })
export class BipsV2Service extends RepositoryV2Service<BipV2> {
  constructor(protected http: HttpClient) {
    super(http, url_servicios + '/v2/bips');
  }

  transform(data: unknown): BipV2 {
    if (!data) return null;
    return new BipV2(data as Partial<BipV2>);
  }
}
