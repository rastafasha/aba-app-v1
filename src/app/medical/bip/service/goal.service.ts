import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  constructor(public http: HttpClient, public authService: AuthService) {}

  listGoals() {
    const URL = url_servicios + '/goal';
    return this.http.get(URL);
  }
  listMaladaptivesGoals(maladaptive: any, patient_id: any) {
    const URL =
      url_servicios +
      '/goal/show/goalsmaladaptives/' +
      maladaptive +
      '/' +
      patient_id;
    return this.http.get(URL);
  }
  // listMaladaptivesGoals(maladaptive:any, patient_id:any){
  //   const headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
  //   const URL = url_servicios+'/goal/show/goalsmaladaptives/'+maladaptive+'/'+patient_id;
  //   return this.http.get(URL, {headers:headers});
  // }

  getGoal(user_id: any) {
    const URL = url_servicios + '/goal/show/' + user_id;
    return this.http.get(URL);
  }

  getGoalbyPatientId(patient_id: any) {
    const URL = url_servicios + '/goal/showgbyPatientId/' + patient_id;
    return this.http.get(URL);
  }
  getStobyGoalinProgress(goal: any) {
    const URL = url_servicios + '/sustitutiongoal/showStogbyGoal/' + goal;
    return this.http.get(URL);
  }
  getGoalbyBipId(bip_id: any) {
    const URL = url_servicios + '/goal/showBipId/' + bip_id;
    return this.http.get(URL);
  }
  createGoal(data) {
    const URL = url_servicios + '/goal/store';
    return this.http.post(URL, data);
  }
  editGoal(data: any, user_id: any) {
    const URL = url_servicios + '/goal/update/' + user_id;
    return this.http.post(URL, data);
  }
  deleteGoal(user_id: any) {
    const URL = url_servicios + '/goal/destroy/' + user_id;
    return this.http.delete(URL);
  }

  showGoalProfile(user_id: any) {
    const URL = url_servicios + '/goal/profile/' + user_id;
    return this.http.get(URL);
  }

  listConfig() {
    const URL = url_servicios + '/goal/config';
    return this.http.get(URL);
  }

  updateSto(data: any, goalmaladaptiveid: any) {
    const URL = url_servicios + '/goal/update/sto/' + goalmaladaptiveid;
    return this.http.put(URL, data);
  }
}
