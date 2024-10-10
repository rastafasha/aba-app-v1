import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppRoutes } from 'src/app/shared/routes/routes';
interface data {
  value: string;
}
@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.scss'],
})
export class EditScheduleComponent {
  public routes = AppRoutes;
  public selectedValue!: string;
  date = new FormControl(new Date());

  selectedList: data[] = [
    { value: 'Choose Department' },
    { value: 'Cardiology' },
    { value: 'Urology' },
    { value: 'Radiology' },
  ];
}
