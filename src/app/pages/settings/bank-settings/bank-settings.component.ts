import { Component } from '@angular/core';
import { AppRoutes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-bank-settings',
  templateUrl: './bank-settings.component.html',
  styleUrls: ['./bank-settings.component.scss'],
})
export class BankSettingsComponent {
  routes = AppRoutes;
}
