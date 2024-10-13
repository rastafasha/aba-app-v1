import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(public http: HttpClient, authService: AuthService) {}

  listRoles() {
    const URL = url_servicios + '/roles';
    return this.http.get(URL);
  }
  storeRole(data: any) {
    const URL = url_servicios + '/roles/store';
    return this.http.post(URL, data);
  }
  getRole(role_id: any) {
    const URL = url_servicios + '/roles/show/' + role_id;
    return this.http.get(URL);
  }
  editRole(data: any, role_id: any) {
    const URL = url_servicios + '/roles/update/' + role_id;
    return this.http.put(URL, data);
  }

  deleteRole(role_id: any) {
    const URL = url_servicios + '/roles/destroy/' + role_id;
    return this.http.delete(URL);
  }
}
