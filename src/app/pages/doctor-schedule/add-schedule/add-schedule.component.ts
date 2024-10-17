import { Component } from '@angular/core';
import { AppRoutes } from 'src/app/shared/routes/routes';
interface data {
  value: string;
}
@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss'],
})
export class AddScheduleComponent {
  routes = AppRoutes;
  selectedValue!: string;

  selectedList: data[] = [
    { value: 'Choose Department' },
    { value: 'Cardiology' },
    { value: 'Urology' },
    { value: 'Radiology' },
  ];
}
