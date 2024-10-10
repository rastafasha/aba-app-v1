import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ClientReportService {
  constructor(public http: HttpClient, public authService: AuthService) {}

  listClientReports() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/client_report';
    return this.http.get(URL, { headers: headers });
  }

  // listClientReportsSearch(page:number=1, search:string='', provider_name_g:number=0,session_date:string= ''){
  //   const headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
  //   let LINK = "";
  //   if(search){
  //     LINK+="&search="+search;
  //   }
  //   if(provider_name_g){
  //     LINK+="&provider_name_g="+provider_name_g;
  //   }
  //   if(session_date){
  //     LINK+="&session_date="+session_date;
  //   }
  //   const URL = url_servicios+'/client_report?page='+page+LINK;
  //   return this.http.get(URL, {headers:headers});
  // }

  listClientReportsSearch(
    page = 1,
    search_doctor = '',
    search_patient = '',
    // speciality_id:number=0,
    date_start = '',
    date_end = '',
    patient_id: any = null
  ) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    let LINK = '';
    if (search_doctor) {
      LINK += '&search_doctor=' + search_doctor;
    }
    if (search_patient) {
      LINK += '&search_patient=' + search_patient;
    }
    // if(speciality_id){
    // LINK+="&speciality_id="+speciality_id;
    // }
    if (date_start) {
      LINK += '&date_start=' + date_start;
    }
    if (date_end) {
      LINK += '&date_end=' + date_end;
    }
    const URL =
      url_servicios + '/client_report/byprofile/?page=' + page + LINK + '/';
    return this.http.get(URL, { headers: headers });
  }

  config() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/client_report/config';
    return this.http.get(URL, { headers: headers });
  }
  getClientReport(id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/client_report/show/' + id;
    return this.http.get(URL, { headers: headers });
  }

  editClientReport(data: any, client_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/client_report/update/' + client_id;
    return this.http.post(URL, data, { headers: headers });
  }
  deleteClientReport(patient_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/client_report/destroy/' + patient_id;
    return this.http.delete(URL, { headers: headers });
  }

  showClientReportbyPatient(patient_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/client_report/byprofile/' + patient_id;
    return this.http.get(URL, { headers: headers });
  }

  getAllClientReportByPatient(
    patient_id: any = '',
    page = 1,
    date_start = '',
    date_end = '',
    noteType?: string
  ) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    let LINK = '';

    if (date_start) {
      LINK += '&date_start=' + date_start;
    }
    if (date_end) {
      LINK += '&date_end=' + date_end;
    }
    if (noteType) LINK += `&noteType=${noteType}`;
    const URL =
      url_servicios +
      '/client_report/byprofile/' +
      patient_id +
      '/?page=' +
      page +
      LINK;
    return this.http.get(URL, { headers: headers });
  }

  getAllClientReportByLocation(
    location_id: any = '',
    page = 1,
    date_start = '',
    date_end = '',
    noteType?: string
  ) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    let LINK = '';

    if (date_start) {
      LINK += '&date_start=' + date_start;
    }
    if (date_end) {
      LINK += '&date_end=' + date_end;
    }
    if (noteType) LINK += `&noteType=${noteType}`;
    const URL =
      url_servicios +
      '/client_report/bylocation/' +
      location_id +
      '/?page=' +
      page +
      LINK;
    return this.http.get(URL, { headers: headers });
  }

  getAllClientReportEmployeeByPatient(
    doctor_id: any = '',
    patient_id: any = '',
    page = 1,
    date_start = '',
    date_end = '',
    noteType?: string
  ) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    let LINK = '';

    if (date_start) {
      LINK += '&date_start=' + date_start;
    }
    if (date_end) {
      LINK += '&date_end=' + date_end;
    }
    if (noteType) LINK += `&noteType=${noteType}`;
    const URL =
      url_servicios +
      '/client_report/byemployee/' +
      doctor_id +
      '/' +
      patient_id +
      '/?page=' +
      page +
      LINK;
    return this.http.get(URL, { headers: headers });
  }

  showClientReportProfile(patient_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/client_report/profile/' + patient_id;
    return this.http.get(URL, { headers: headers });
  }

  create(data) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/client_report/store';
    return this.http.post(URL, data, { headers: headers });
  }
  udpate(data: any, client_id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.authService.token,
    });
    const URL = url_servicios + '/client_report/update/' + client_id;
    return this.http.post(URL, data, { headers: headers });
  }
}
