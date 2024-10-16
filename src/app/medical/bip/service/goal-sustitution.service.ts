import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GoalSustitutionService {
  constructor(public http: HttpClient, public authService: AuthService) {}

  listGoalSustitutions() {
    const URL = url_servicios + '/sustitutiongoal';
    return this.http.get(URL);
  }
  listMaladaptivesGoalSustitutions(maladaptive: any) {
    const URL =
      url_servicios + '/sustitutiongoal/show/goalsmaladaptives/' + maladaptive;
    return this.http.get(URL);
  }
  // listMaladaptivesGoals(maladaptive:any, patient_id:any){
  //   const headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
  //   const URL = url_servicios+'/goal/show/goalsmaladaptives/'+maladaptive+'/'+patient_id;
  //   return this.http.get(URL, {headers:headers});
  // }

  getGoalSustitution(user_id: any) {
    const URL = url_servicios + '/sustitutiongoal/show/' + user_id;
    return this.http.get(URL);
  }

  getGoalSustitutionbyPatientId(patient_id: any) {
    const URL =
      url_servicios + '/sustitutiongoal/showgbyPatientId/' + patient_id;
    return this.http.get(URL);
  }
  getGoalSustitutionbyBipId(bip_id: any) {
    const URL = url_servicios + '/sustitutiongoal/showBipId/' + bip_id;
    return this.http.get(URL);
  }
  createGoalSustitution(data) {
    const URL = url_servicios + '/sustitutiongoal/store';
    return this.http.post(URL, data);
  }
  editGoalSustitution(data: any, user_id: any) {
    const URL = url_servicios + '/sustitutiongoal/update/' + user_id;
    return this.http.post(URL, data);
  }
  deleteGoalSustitution(user_id: any) {
    const URL = url_servicios + '/sustitutiongoal/destroy/' + user_id;
    return this.http.delete(URL);
  }

  showGoalSustitutionProfile(user_id: any) {
    const URL = url_servicios + '/sustitutiongoal/profile/' + user_id;
    return this.http.get(URL);
  }

  listConfigSustitution() {
    const URL = url_servicios + '/sustitutiongoal/config';
    return this.http.get(URL);
  }

  updateStoSustitutionSto(data: any, goalmaladaptiveid: any) {
    const URL =
      url_servicios + '/sustitutiongoal/update/sto/' + goalmaladaptiveid;
    return this.http.put(URL, data);
  }
}
