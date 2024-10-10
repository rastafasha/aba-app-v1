import { Component } from '@angular/core';
import { AppRoutes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-doctor-setting',
  templateUrl: './doctor-setting.component.html',
  styleUrls: ['./doctor-setting.component.scss'],
})
export class DoctorSettingComponent {
  public routes = AppRoutes;
}
