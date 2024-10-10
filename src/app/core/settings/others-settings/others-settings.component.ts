import { Component } from '@angular/core';
import { AppRoutes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-others-settings',
  templateUrl: './others-settings.component.html',
  styleUrls: ['./others-settings.component.scss'],
})
export class OthersSettingsComponent {
  public routes = AppRoutes;
}
