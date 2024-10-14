import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  routes = AppRoutes;

  constructor(public router: Router) {}
  direction() {
    this.router.navigate([AppRoutes.auth.login]);
  }
}
