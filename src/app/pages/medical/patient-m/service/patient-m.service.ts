import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PatientMService {
  constructor(public http: HttpClient, authService: AuthService) {}

  listConfigPatients(
    page = 1,
    patient_id = '',
    name_patient = '',
    email_patient = ''
  ) {
    let LINK = '';
    if (patient_id) {
      LINK += '&patient_id=' + patient_id;
    }
    if (name_patient) {
      LINK += '&name_patient=' + name_patient;
    }
    if (email_patient) {
      LINK += '&email_patient=' + email_patient;
    }
    const URL = url_servicios + '/patients?page=' + page + LINK;
    return this.http.get<any>(URL);
  }

  // listPatients(){
  //   const headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
  //   const URL = url_servicios+'/patients';
  //   return this.http.get<any>(URL, {headers:headers});
  // }

  listPatients(search: any, status: any, location_id: any) {
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

  configPatients(page = 1, search = '') {
    const URL = url_servicios + '/patients?page=' + page + '&search=' + search;
    return this.http.get<any>(URL);
  }

  getPatient(client_id: any) {
    const URL = url_servicios + '/patients/show/' + client_id;
    return this.http.get<any>(URL);
  }
  getPatientsByDoctor(doctor_id: any) {
    const URL = url_servicios + '/patients/byDoctor/' + doctor_id;
    return this.http.get<any>(URL);
  }
  createPatient(data) {
    const URL = url_servicios + '/patients/store';
    return this.http.post<any>(URL, data);
  }
  editPatient(data: any, client_id: any) {
    const URL = url_servicios + '/patients/update/' + client_id;
    return this.http.post<any>(URL, data);
  }
  patientUpdate(data: any, client_id: any) {
    const URL = url_servicios + '/patients/patientupdate/' + client_id;
    return this.http.post<any>(URL, data);
  }
  deletePatient(client_id: any) {
    const URL = url_servicios + '/patients/destroy/' + client_id;
    return this.http.delete<any>(URL);
  }

  showPatientProfile(client_id: any) {
    const URL = url_servicios + '/patients/profile/' + client_id;
    return this.http.get<any>(URL);
  }
  getPatientByPatientid(patient_id: any) {
    const URL = url_servicios + '/patients/shobypatientid/' + patient_id;
    return this.http.get<any>(URL);
  }

  listConfig(location_id: any): Observable<any> {
    const URL = url_servicios + '/patients/config/' + location_id;
    return this.http.get<any>(URL).pipe(map((resp: any) => resp));
  }

  getPatientByLocations(location_id: any) {
    const URL = url_servicios + '/patients/shobypatienLocation/' + location_id;
    return this.http.get<any>(URL);
  }

  updateStatus(data: any, client_id: any) {
    const URL = url_servicios + '/patients/update/eligibility/' + client_id;
    return this.http.put<any>(URL, data);
  }

  //files

  storeLaboratory(data: any) {
    const URL = url_servicios + '/patient_file/store';
    return this.http.post<any>(URL, data);
  }

  getLaboratoryByPatient(patient_id: any) {
    const URL = url_servicios + '/patient_file/showBypatient/' + patient_id;
    return this.http.get<any>(URL);
  }

  editLaboratory(data: any, laboratory_id: any) {
    const URL = url_servicios + '/patient_file/update/' + laboratory_id;
    return this.http.post<any>(URL, data);
  }

  deleteLaboratory(laboratory_id: any) {
    const URL = url_servicios + '/patient_file/delete-file/' + laboratory_id;
    return this.http.delete<any>(URL);
  }

  getPosCovered() {
    const URL = '/assets/json/poscovered.json';
    return this.http.get<any>(URL);
  }

  // config log report

  configPatientsLogReport() {
    const URL = url_servicios + '/clientlogreport';
    return this.http.get<any>(URL);
  }

  listPatientLogReport(search: any, status: any): Observable<any> {
    let LINK = '?T=';
    if (search) {
      LINK += '&search=' + search;
    }
    if (status) {
      LINK += '&state=' + status;
    }

    const URL = url_servicios + '/clientlogreport' + LINK;
    return this.http.get<any>(URL).pipe(
      map((value) => {
        return value.patients.map((item) => {
          return {
            ...item,
            pa_assessments: JSON.parse(item['pa_assessments']),
          };
        });
      })
    );
    // return this.http.get<any>(URL, {headers: headers}).pipe(
    //   finalize(()=> this.isLoadingSubject.next(false))
    // )
  }
}
