import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/core/auth/auth.service';
declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  user: any;
  roles: any = [];
  permissions: any = [];

  constructor(public http: HttpClient, public authService: AuthService) {}

  listDoctors() {
    const URL = url_servicios + '/doctors';
    return this.http.get(URL);
  }

  listConfig() {
    const URL = url_servicios + '/doctors/config';
    return this.http.get(URL);
  }
  listConfigLocation(location_id: any) {
    const URL = url_servicios + '/doctors/configlocation/' + location_id;
    return this.http.get(URL);
  }
  storeDoctor(data: any) {
    const URL = url_servicios + '/doctors/store';
    return this.http.post(URL, data);
  }
  showDoctor(doctor_id: any) {
    const URL = url_servicios + '/doctors/show/' + doctor_id;
    return this.http.get(URL);
  }

  editDoctor(data: any, doctor_id: any) {
    const URL = url_servicios + '/doctors/update/' + doctor_id;
    return this.http.post(URL, data);
  }

  showDoctorProfile(doctor_id: any) {
    const URL = url_servicios + '/doctors/profile/' + doctor_id;
    return this.http.get(URL);
  }
  editDoctorProfile(data: any, doctor_id: any) {
    const URL = url_servicios + '/doctors/update/' + doctor_id;
    return this.http.post(URL, data);
  }

  yo(user: any) {
    // const headers = this.headers;
    const URL = url_servicios + '/me';
    return this.http.post(URL, user);
  }

  deleteDoctor(doctor_id: any) {
    const URL = url_servicios + '/doctors/destroy/' + doctor_id;
    return this.http.delete(URL);
  }

  closeMenuSidebar() {
    $('.sidebar').addClass('cerrar');
    $('.menu-opened').remove('menu-opened');
  }
  getUserRoles() {
    const USER = localStorage.getItem('user');
    this.user = JSON.parse(USER ? USER : '');
    this.roles = this.user.roles[0];
    this.permissions = this.user.permissions;
  }

  updateStatus(data: any, doctor_id: any) {
    const URL = url_servicios + '/doctors/update/status/' + doctor_id;
    return this.http.put(URL, data);
  }

  getEmployeesByLocation(location_id: any) {
    const URL = url_servicios + '/doctors/employeesbylocation/' + location_id;
    return this.http.get(URL);
  }
}
