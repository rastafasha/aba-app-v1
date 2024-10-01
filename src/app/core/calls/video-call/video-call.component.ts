import { Component } from '@angular/core';
import { AppRoutes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.scss'],
})
export class VideoCallComponent {
  public routes = AppRoutes;
}
