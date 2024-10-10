import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-change-password2',
  templateUrl: './change-password2.component.html',
  styleUrls: ['./change-password2.component.scss'],
})
export class ChangePassword2Component {
  public routes = AppRoutes;

  constructor(public router: Router) {}

  direction() {
    this.router.navigate([AppRoutes.login]);
  }
}
