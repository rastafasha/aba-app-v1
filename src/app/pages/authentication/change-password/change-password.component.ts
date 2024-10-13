import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  routes = AppRoutes;

  constructor(public router: Router) {}

  direction() {
    this.router.navigate([AppRoutes.login]);
  }
}
