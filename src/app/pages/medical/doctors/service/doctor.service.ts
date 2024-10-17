import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AppUser } from 'src/app/shared/models/users.models';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private user: AppUser;
  roles = [];
  permissions = [];

  constructor(public http: HttpClient) {}

  listDoctors() {
    const URL = url_servicios + '/doctors';
    return this.http.get<any>(URL);
  }

  listConfig() {
    const URL = url_servicios + '/doctors/config';
    return this.http.get<any>(URL);
  }
  listConfigLocation(location_id: number) {
    const URL = url_servicios + '/doctors/configlocation/' + location_id;
    return this.http.get<any>(URL);
  }
  storeDoctor(data: any) {
    const URL = url_servicios + '/doctors/store';
    return this.http.post<any>(URL, data);
  }
  showDoctor(doctor_id: any) {
    const URL = url_servicios + '/doctors/show/' + doctor_id;
    return this.http.get<any>(URL);
  }

  editDoctor(data: any, doctor_id: any) {
    const URL = url_servicios + '/doctors/update/' + doctor_id;
    return this.http.post<any>(URL, data);
  }

  showDoctorProfile(doctor_id: any) {
    const URL = url_servicios + '/doctors/profile/' + doctor_id;
    return this.http.get<any>(URL);
  }
  editDoctorProfile(data: any, doctor_id: any) {
    const URL = url_servicios + '/doctors/update/' + doctor_id;
    return this.http.post<any>(URL, data);
  }

  yo(user: any) {
    // const headers = this.headers;
    const URL = url_servicios + '/me';
    return this.http.post<any>(URL, user);
  }

  deleteDoctor(doctor_id: any) {
    const URL = url_servicios + '/doctors/destroy/' + doctor_id;
    return this.http.delete<any>(URL);
  }

  getUserRoles() {
    const USER = localStorage.getItem('user');
    this.user = JSON.parse(USER ? USER : '');
    this.roles = this.user.roles;
    this.permissions = this.user.permissions;
  }

  updateStatus(data: any, doctor_id: any) {
    const URL = url_servicios + '/doctors/update/status/' + doctor_id;
    return this.http.put<any>(URL, data);
  }

  getEmployeesByLocation(location_id: any) {
    const URL = url_servicios + '/doctors/employeesbylocation/' + location_id;
    return this.http.get<any>(URL);
  }
}
