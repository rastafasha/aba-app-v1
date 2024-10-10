import { Component } from '@angular/core';
import { AppRoutes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-social-settings',
  templateUrl: './social-settings.component.html',
  styleUrls: ['./social-settings.component.scss'],
})
export class SocialSettingsComponent {
  public routes = AppRoutes;
}
