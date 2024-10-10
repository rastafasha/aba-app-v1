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
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/doctors';
    return this.http.get(URL, { headers: headers });
  }

  listConfig() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/doctors/config';
    return this.http.get(URL, { headers: headers });
  }
  listConfigLocation(location_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/doctors/configlocation/' + location_id;
    return this.http.get(URL, { headers: headers });
  }
  storeDoctor(data: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/doctors/store';
    return this.http.post(URL, data, { headers: headers });
  }
  showDoctor(doctor_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/doctors/show/' + doctor_id;
    return this.http.get(URL, { headers: headers });
  }

  editDoctor(data: any, doctor_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/doctors/update/' + doctor_id;
    return this.http.post(URL, data, { headers: headers });
  }

  showDoctorProfile(doctor_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/doctors/profile/' + doctor_id;
    return this.http.get(URL, { headers: headers });
  }
  editDoctorProfile(data: any, doctor_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/doctors/update/' + doctor_id;
    return this.http.post(URL, data, { headers: headers });
  }

  yo(user: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    // const headers = this.headers;
    const URL = url_servicios + '/me';
    return this.http.post(URL, user, { headers: headers });
  }

  deleteDoctor(doctor_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/doctors/destroy/' + doctor_id;
    return this.http.delete(URL, { headers: headers });
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
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/doctors/update/status/' + doctor_id;
    return this.http.put(URL, data, { headers: headers });
  }

  getEmployeesByLocation(location_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/doctors/employeesbylocation/' + location_id;
    return this.http.get(URL, { headers: headers });
  }
}
