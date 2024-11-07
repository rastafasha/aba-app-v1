import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { url_servicios } from 'src/app/config/config';
import { Patient } from '../models';

@Injectable({ providedIn: 'root' })
export class PatientsService extends ApiService<Patient> {
  constructor(protected http: HttpClient) {
    super(http, url_servicios + '/patients');
  }
}
