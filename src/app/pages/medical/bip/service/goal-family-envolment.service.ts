import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GoalFamilyEnvolmentService {
  constructor(public http: HttpClient, authService: AuthService) {}

  listGoalFamilyEnvolments() {
    const URL = url_servicios + '/familyenvolvment';
    return this.http.get<any>(URL);
  }

  getGoalFamilyEnvolment(user_id: any) {
    const URL = url_servicios + '/familyenvolvment/show/' + user_id;
    return this.http.get<any>(URL);
  }

  getGoalFamilyEnvolmentbyPatientId(patient_id: any) {
    const URL =
      url_servicios + '/familyenvolvment/showgbyPatientId/' + patient_id;
    return this.http.get<any>(URL);
  }

  createGoalFamilyEnvolment(data) {
    const URL = url_servicios + '/familyenvolvment/store';
    return this.http.post<any>(URL, data);
  }
  editGoalFamilyEnvolment(data: any, user_id: any) {
    const URL = url_servicios + '/familyenvolvment/update/' + user_id;
    return this.http.post<any>(URL, data);
  }
  deleteGoalFamilyEnvolment(user_id: any) {
    const URL = url_servicios + '/familyenvolvment/destroy/' + user_id;
    return this.http.delete<any>(URL);
  }

  showGoalFamilyEnvolmentProfile(user_id: any) {
    const URL = url_servicios + '/familyenvolvment/profile/' + user_id;
    return this.http.get<any>(URL);
  }
}
