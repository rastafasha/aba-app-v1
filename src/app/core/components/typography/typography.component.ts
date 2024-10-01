import { Component } from '@angular/core';
import { AppRoutes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.scss'],
})
export class TypographyComponent {
  public routes = AppRoutes;
}
