import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { url_servicios } from 'src/app/config/config';
import { ApiV2Response, CreateResponse, PatientV2 } from 'src/app/core/models';
import { PatientsV2Service } from 'src/app/core/services';
import { PaServicesV2Service } from 'src/app/core/services/pa-services.v2.service';
import { PatientMService } from './patient-m.service';

@Injectable({
  providedIn: 'root',
})
export class PatientsUseCasesService {
  savePatient(value: PatientV2, id) {
    //actualizar o crear?
    const action$: Observable<
      CreateResponse<PatientV2> | ApiV2Response<PatientV2>
    > = id
      ? this.patientsV2Service.update(value, id)
      : this.patientsV2Service.create(value);
    //
    return action$.pipe(
      //crear nuevos pa_services y devolver el patient actualizado
      switchMap((resp) => {
        const pa_services = value.pa_services.filter((item) => item.id < 0);
        if (pa_services.length === 0) {
          return of(resp);
        }
        return combineLatest(
          pa_services.map((item) => this.paServicesV2Service.create(item))
        ).pipe(map(() => resp));
      })
      // actualizamos la lista de pa_services
      // switchMap((resp) => {
      //   return this.paServicesV2Service.list({per_page:0},resp.data.id)
      // })
    );
  }
  savePatientCreate(value: PatientV2) {
    //crear
    const action$: Observable<
      CreateResponse<PatientV2> | ApiV2Response<PatientV2>
    > = this.patientsV2Service.create(value);
    //
    return action$.pipe(
      //crear nuevos pa_services y devolver el patient actualizado
      switchMap((resp) => {
        const pa_services = value.pa_services.filter((item) => item.id < 0);
        if (pa_services.length === 0) {
          return of(resp);
        }
        return combineLatest(
          pa_services.map((item) => this.paServicesV2Service.create(item))
        ).pipe(map(() => resp));
      })
      // actualizamos la lista de pa_services
      // switchMap((resp) => {
      //   return this.paServicesV2Service.list({per_page:0},resp.data.id)
      // })
    );
  }
  checkEmailExistense(email: string) {
    return this.http
      .get<any>(`${url_servicios}/doctors/check-email-exist/${email}`)
      .pipe(
        map((response) => {
          return response.exist.email !== null;
          // this.emailExists = response.exist.email;
          // if (this.emailExists === null) {
          //   this.emailExists = false;
          // } else {
          //   this.emailExists = true;
          // }
        })
      );
  }

  deleteLaboratory(id: number) {
    return of(null);
  }
  getPosCovered() {
    return this.patientsMService.getPosCovered().pipe(map((res) => res.data));
  }

  loadFile(event) {
    throw new Error('Method not implemented.');
  }
  deleteFile(file: File) {
    return of(null);
  }
  saveFiles(files: File[]) {
    throw new Error('Method not implemented.');
  }
  goBack() {
    this.location.back();
  }
  init() {
    // Initialize any necessary data or services here.
  }

  constructor(
    private location: Location,
    private patientsMService: PatientMService,
    private patientsV2Service: PatientsV2Service,
    private paServicesV2Service: PaServicesV2Service,
    private http: HttpClient
  ) {}
}
