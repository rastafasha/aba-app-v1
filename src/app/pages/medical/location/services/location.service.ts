import { HttpClient } from '@angular/common/http';
import { Injectable, Query } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import {
  LocationApi,
  LocationApiResponse,
  LocationViewApiResponse,
} from '../models/locations.model';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(public http: HttpClient) {}

  listAppointmentPays(
    page = 1,
    client_id = '',
    name_client = '',
    email_client = '',
    doctor_id = '',
    name_doctor = '',
    email_doctor = ''
  ) {
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
    return this.http.get<any>(URL);
  }

  getLocations(page: number) {
    const URL = url_servicios + '/location';
    return this.http.get<LocationApiResponse<LocationApi[]>>(URL);
  }

  listLocationPatients(search: any, status: any, location_id: any) {
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
    return this.http.get<any>(URL);
    // return this.http.get<any>(URL, {headers: headers}).pipe(
    //   finalize(()=> this.isLoadingSubject.next(false))
    // )
  }
  listConfig() {
    const URL = url_servicios + '/location/config';
    return this.http.get<any>(URL);
  }
  storeLocation(data: any) {
    const URL = url_servicios + '/location/store';
    return this.http.post<any>(URL, data);
  }
  getLocation(location_id: number) {
    const URL = url_servicios + '/location/show/' + location_id;
    return this.http.get<LocationViewApiResponse>(URL);
  }
  editLocation(data: any, location_id: any) {
    const URL = url_servicios + '/location/update/' + location_id;
    return this.http.post<any>(URL, data);
  }

  deleteLocation(location_id: any) {
    const URL = url_servicios + '/roles/destroy/' + location_id;
    return this.http.delete<any>(URL);
  }
}
