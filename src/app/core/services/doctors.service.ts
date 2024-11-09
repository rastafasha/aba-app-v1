import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { url_servicios } from 'src/app/config/config';
import { Doctor } from '../models';

@Injectable({ providedIn: 'root' })
export class DoctorsService extends ApiService<Doctor> {
  constructor(protected http: HttpClient) {
    super(http, url_servicios + '/doctors');
  }
}
