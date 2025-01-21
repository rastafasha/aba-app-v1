import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { DoctorV2 } from '../models';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class DoctorsV2Service extends ApiService<DoctorV2> {
  constructor(protected http: HttpClient) {
    super(http, url_servicios + '/doctors');
  }
}
