import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GoalSustitutionService {
  constructor(public http: HttpClient, authService: AuthService) {}

  listGoalSustitutions() {
    const URL = url_servicios + '/sustitutiongoal';
    return this.http.get<any>(URL);
  }
  listMaladaptivesGoalSustitutions(maladaptive: any) {
    const URL =
      url_servicios + '/sustitutiongoal/show/goalsmaladaptives/' + maladaptive;
    return this.http.get<any>(URL);
  }
  // listMaladaptivesGoals(maladaptive:any, patient_id:any){
  //   const headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
  //   const URL = url_servicios+'/goal/show/goalsmaladaptives/'+maladaptive+'/'+patient_id;
  //   return this.http.get<any>(URL, {headers:headers});
  // }

  getGoalSustitution(user_id: any) {
    const URL = url_servicios + '/sustitutiongoal/show/' + user_id;
    return this.http.get<any>(URL);
  }

  getGoalSustitutionbyPatientId(patient_id: any) {
    const URL =
      url_servicios + '/sustitutiongoal/showgbyPatientId/' + patient_id;
    return this.http.get<any>(URL);
  }
  getGoalSustitutionbyBipId(bip_id: any) {
    const URL = url_servicios + '/sustitutiongoal/showBipId/' + bip_id;
    return this.http.get<any>(URL);
  }
  createGoalSustitution(data) {
    const URL = url_servicios + '/sustitutiongoal/store';
    return this.http.post<any>(URL, data);
  }
  editGoalSustitution(data: any, user_id: any) {
    const URL = url_servicios + '/sustitutiongoal/update/' + user_id;
    return this.http.post<any>(URL, data);
  }
  deleteGoalSustitution(user_id: any) {
    const URL = url_servicios + '/sustitutiongoal/destroy/' + user_id;
    return this.http.delete<any>(URL);
  }

  showGoalSustitutionProfile(user_id: any) {
    const URL = url_servicios + '/sustitutiongoal/profile/' + user_id;
    return this.http.get<any>(URL);
  }

  listConfigSustitution() {
    const URL = url_servicios + '/sustitutiongoal/config';
    return this.http.get<any>(URL);
  }

  updateStoSustitutionSto(data: any, goalmaladaptiveid: any) {
    const URL =
      url_servicios + '/sustitutiongoal/update/sto/' + goalmaladaptiveid;
    return this.http.put<any>(URL, data);
  }
}
