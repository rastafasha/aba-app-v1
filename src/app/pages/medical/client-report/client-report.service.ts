import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { url_servicios } from 'src/app/config/config';
import { NoteBcbaBuilder, NoteRbtBuilder } from 'src/app/core/models';
import { LocationLogFilter } from '../location/models/locations.model';
import {
  ClientReportByLocation,
  ClientReportConfig,
} from './client-report.model';

@Injectable({
  providedIn: 'root',
})
export class ClientReportService {
  constructor(public http: HttpClient) {}

  listClientReports() {
    const URL = url_servicios + '/client_report';
    return this.http.get<any>(URL);
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
  //   return this.http.get<any>(URL, {headers:headers});
  // }

  listClientReportsSearch(
    page = 1,
    search_doctor = '',
    search_patient = '',
    // speciality_id:number=0,
    date_start = '',
    date_end = '',
    patient_id = null
  ) {
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
    return this.http.get<any>(URL);
  }

  config() {
    const URL = url_servicios + '/client_report/config';
    return this.http.get<ClientReportConfig>(URL);
  }
  getClientReport(id: any) {
    const URL = url_servicios + '/client_report/show/' + id;
    return this.http.get<any>(URL);
  }

  editClientReport(data: any, client_id: any) {
    const URL = url_servicios + '/client_report/update/' + client_id;
    return this.http.post<any>(URL, data);
  }
  deleteClientReport(patient_id: any) {
    const URL = url_servicios + '/client_report/destroy/' + patient_id;
    return this.http.delete<any>(URL);
  }

  showClientReportbyPatient(patient_id: any) {
    const URL = url_servicios + '/client_report/byprofile/' + patient_id;
    return this.http.get<any>(URL);
  }

  getAllClientReportByPatient(
    patient_id = '',
    page = 1,
    date_start = '',
    date_end = '',
    noteType?: string
  ) {
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
    return this.http.get<any>(URL);
  }

  getAllClientReportByLocation(
    location_id: number,
    queryParams: Partial<LocationLogFilter>
  ) {
    const paramsNotNull: { [key: string]: string | number } = {};
    Object.keys(queryParams).forEach((key) => {
      if (queryParams[key]) {
        paramsNotNull[key] = `${queryParams[key]}`;
      }
    });
    const params = new HttpParams({
      fromObject: paramsNotNull,
    }).toString();

    const URL = `${url_servicios}/client_report/bylocation/${location_id}?${params}`;
    return this.http.get<ClientReportByLocation>(URL).pipe(
      map((response) => {
        response.noteRbts =
          response.noteRbts?.map((item) => new NoteRbtBuilder(item)) ?? [];
        response.noteBcbas =
          response.noteBcbas?.map((item) => new NoteBcbaBuilder(item)) ?? [];
        return response;
      })
    );
  }

  getAllClientReportEmployeeByPatient(
    doctor_id = '',
    patient_id = '',
    page = 1,
    date_start = '',
    date_end = '',
    noteType?: string
  ) {
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
    return this.http.get<any>(URL);
  }

  showClientReportProfile(patient_id: any) {
    const URL = url_servicios + '/client_report/profile/' + patient_id;
    return this.http.get<any>(URL);
  }

  create(data) {
    const URL = url_servicios + '/client_report/store';
    return this.http.post<any>(URL, data);
  }
  udpate(data: any, client_id: any) {
    const URL = url_servicios + '/client_report/update/' + client_id;
    return this.http.post<any>(URL, data);
  }
}
