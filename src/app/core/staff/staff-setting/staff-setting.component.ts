import { Component } from '@angular/core';
import { AppRoutes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-staff-setting',
  templateUrl: './staff-setting.component.html',
  styleUrls: ['./staff-setting.component.scss'],
})
export class StaffSettingComponent {
  public routes = AppRoutes;
}
