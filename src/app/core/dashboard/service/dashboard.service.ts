import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(public http: HttpClient, public authService: AuthService) {}

  dashboardAdmin(data) {
    const URL = url_servicios + '/dashboard/admin';
    return this.http.post(URL, data);
  }
  dashboardAdminYear(data) {
    const URL = url_servicios + '/dashboard/admin-year';
    return this.http.post(URL, data);
  }

  getConfigDashboard() {
    const URL = url_servicios + '/dashboard/config';
    return this.http.get(URL);
  }
  dashboardDoctor(data) {
    const URL = url_servicios + '/dashboard/doctor';
    return this.http.post(URL, data);
  }
  dashboardDoctorYear(data) {
    const URL = url_servicios + '/dashboard/doctor-year';
    return this.http.post(URL, data);
  }
  getConfigDashboardPatient() {
    const URL = url_servicios + '/dashboard/config/patients';
    return this.http.get(URL);
  }
  dashboardPatient(data) {
    const URL = url_servicios + '/dashboard/patient';
    return this.http.post(URL, data);
  }
  dashboardPatientYear(data) {
    const URL = url_servicios + '/dashboard/patient-year';
    return this.http.post(URL, data);
  }
}
