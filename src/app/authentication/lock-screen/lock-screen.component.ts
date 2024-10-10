import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrls: ['./lock-screen.component.scss'],
})
export class LockScreenComponent {
  public routes = AppRoutes;
  public passwordClass = false;

  constructor(public router: Router) {}

  direction() {
    this.router.navigate([AppRoutes.login]);
  }
  togglePassword() {
    this.passwordClass = !this.passwordClass;
  }
}
