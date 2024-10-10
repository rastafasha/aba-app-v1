import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(public http: HttpClient, public authService: AuthService) {}

  listAppointmentPays(
    page: number = 1,
    client_id: string = '',
    name_client: string = '',
    email_client: string = '',
    doctor_id: string = '',
    name_doctor: string = '',
    email_doctor: string = ''
  ) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    let LINK = '';
    if (client_id) {
      LINK += '&client_id=' + client_id;
    }
    if (name_client) {
      LINK += '&name_client=' + name_client;
    }
    if (email_client) {
      LINK += '&email_client=' + email_client;
    }
    if (doctor_id) {
      LINK += '&doctor_id=' + doctor_id;
    }
    if (name_doctor) {
      LINK += '&name_doctor=' + name_doctor;
    }
    if (email_doctor) {
      LINK += '&email_doctor=' + email_doctor;
    }
    const URL = url_servicios + '/appointmentpay?page=' + page + LINK;
    return this.http.get(URL, { headers: headers });
  }

  getLocations() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/location';
    return this.http.get(URL, { headers: headers });
  }

  listLocationPatients(search: any, status: any, location_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });

    let LINK = '?T=';
    if (search) {
      LINK += '&search=' + search;
    }
    if (status) {
      LINK += '&state=' + status;
    }
    if (location_id) {
      LINK += '&location_id=' + location_id;
    }

    const URL = url_servicios + '/patients' + LINK;
    return this.http.get(URL, { headers: headers });
    // return this.http.get(URL, {headers: headers}).pipe(
    //   finalize(()=> this.isLoadingSubject.next(false))
    // )
  }
  listConfig() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/location/config';
    return this.http.get(URL, { headers: headers });
  }
  storeLocation(data: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/location/store';
    return this.http.post(URL, data, { headers: headers });
  }
  getLocation(location_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/location/show/' + location_id;
    return this.http.get(URL, { headers: headers });
  }
  editLocation(data: any, location_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/location/update/' + location_id;
    return this.http.post(URL, data, { headers: headers });
  }

  deleteLocation(location_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/roles/destroy/' + location_id;
    return this.http.delete(URL, { headers: headers });
  }
}
