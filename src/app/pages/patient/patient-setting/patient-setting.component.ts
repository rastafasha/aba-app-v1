import { Component } from '@angular/core';
import { AppRoutes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-patient-setting',
  templateUrl: './patient-setting.component.html',
  styleUrls: ['./patient-setting.component.scss'],
})
export class PatientSettingComponent {
  routes = AppRoutes;
}
