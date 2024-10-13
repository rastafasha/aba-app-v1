import { Component } from '@angular/core';
import { AppRoutes } from 'src/app/shared/routes/routes';
@Component({
  selector: 'app-error500',
  templateUrl: './error500.component.html',
  styleUrls: ['./error500.component.scss'],
})
export class Error500Component {
  routes = AppRoutes;
}
