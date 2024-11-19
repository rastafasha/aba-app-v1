import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url_servicios } from 'src/app/config/config';
import {
  CreatePaServiceDto,
  PaService,
  PaServiceResponse,
  PaServicesResponse,
} from 'src/app/shared/interfaces/pa-service.interface';

@Injectable({
  providedIn: 'root',
})
export class PaServiceService {
  constructor(private http: HttpClient) {}

  getPatientPaServices(
    patientId: string | number
  ): Observable<PaServicesResponse> {
    return this.http.get<PaServicesResponse>(
      `${url_servicios}/patients/${patientId}/pa-services`
    );
  }

  createPaService(
    patientId: string | number,
    paService: CreatePaServiceDto
  ): Observable<PaServiceResponse> {
    return this.http.post<PaServiceResponse>(
      `${url_servicios}/patients/${patientId}/pa-services`,
      paService
    );
  }

  updatePaService(
    patientId: string | number,
    paServiceId: number,
    paService: Partial<PaService>
  ): Observable<PaServiceResponse> {
    return this.http.put<PaServiceResponse>(
      `${url_servicios}/patients/${patientId}/pa-services/${paServiceId}`,
      paService
    );
  }

  deletePaService(
    patientId: string | number,
    paServiceId: number
  ): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${url_servicios}/patients/${patientId}/pa-services/${paServiceId}`
    );
  }
}
