import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import {
  DashboardAdminResponse,
  DashboardAdminYearResponse,
} from '../models/dashboard.models';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(public http: HttpClient) {}

  dashboardAdmin(data) {
    const URL = url_servicios + '/dashboard/admin';
    return this.http.post<DashboardAdminResponse>(URL, data);
  }
  dashboardAdminYear(data) {
    const URL = url_servicios + '/dashboard/admin-year';
    return this.http.post<DashboardAdminYearResponse>(URL, data);
  }
  getConfigDashboard() {
    const URL = url_servicios + '/dashboard/config';
    return this.http.get<any>(URL);
  }
  dashboardDoctor(data) {
    const URL = url_servicios + '/dashboard/doctor';
    return this.http.post<any>(URL, data);
  }
  dashboardDoctorYear(data) {
    const URL = url_servicios + '/dashboard/doctor-year';
    return this.http.post<any>(URL, data);
  }
  getConfigDashboardPatient() {
    const URL = url_servicios + '/dashboard/config/patients';
    return this.http.get<any>(URL);
  }
  dashboardPatient(data) {
    const URL = url_servicios + '/dashboard/patient';
    return this.http.post<any>(URL, data);
  }
  dashboardPatientYear(data) {
    const URL = url_servicios + '/dashboard/patient-year';
    return this.http.post<any>(URL, data);
  }
}
