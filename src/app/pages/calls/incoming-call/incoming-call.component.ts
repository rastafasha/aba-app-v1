import { Component } from '@angular/core';
import { AppRoutes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-incoming-call',
  templateUrl: './incoming-call.component.html',
  styleUrls: ['./incoming-call.component.scss'],
})
export class IncomingCallComponent {
  routes = AppRoutes;
  closeModal = false;

  closeModalFunc() {
    this.closeModal = !this.closeModal;
  }
}
