import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppRoutes } from 'src/app/shared/routes/routes';
interface data {
  value: string;
}
@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.scss'],
})
export class EditAppointmentComponent {
  routes = AppRoutes;
  deleteIcon = true;
  selectedValue!: string;
  date = new FormControl(new Date());

  deleteIconFunc() {
    this.deleteIcon = !this.deleteIcon;
  }
  selectedList: data[] = [
    { value: 'Select Doctor' },
    { value: 'Dr.Bernardo James' },
    { value: 'Dr.Andrea Lalema' },
    { value: 'Dr.William Stephin' },
  ];
}
