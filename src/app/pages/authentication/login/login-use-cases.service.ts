import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AppUser } from 'src/app/core/models';
import { AppRoutes } from 'src/app/shared/routes/routes';

@Injectable({
  providedIn: 'root',
})
export class LoginUseCasesService {
  user: AppUser;

  constructor(private auth: AuthService, private router: Router) {}

  init() {
    this.getUser();
  }

  getUser() {
    if (!this.auth.user) {
      this.user = null;
      return;
    }
    this.user = this.auth.user as AppUser;
    this.getUserRol();
  }

  getUserRol() {
    const mainRole = this.user?.roles?.[0];
    if (!mainRole) {
      return;
    }

    switch (mainRole) {
      case 'SUPERADMIN':
        this.router.navigate([AppRoutes.dashboard.admin]);
        break;
      // solo tiene una locacion pero se comporta como superadmin
      case 'MANAGER':
        // this.router.navigate([AppRoutes.dashboard.admin]);
        this.router.navigate([AppRoutes.location.view, this.user.location_id]);
        break;
      //roles secundarios son multilocation
      case 'BCBA':
        this.router.navigate([AppRoutes.doctors.profile, this.user.id]);
        break;
      case 'RBT':
        this.router.navigate([AppRoutes.doctors.profile, this.user.id]);
        break;
      default:
        break;
    }
  }

  submit(email: string, password: string) {
    return this.auth.login(email ?? '', password ?? '');
  }
}
