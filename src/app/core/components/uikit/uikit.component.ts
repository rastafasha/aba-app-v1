import { Component } from '@angular/core';
import { AppRoutes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-uikit',
  templateUrl: './uikit.component.html',
  styleUrls: ['./uikit.component.scss'],
})
export class UikitComponent {
  public routes = AppRoutes;
}
