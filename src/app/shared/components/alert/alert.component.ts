import { Component, Input } from '@angular/core';

export type AlertType = 'info' | 'warning' | 'danger';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() title: string;
  @Input() content: string;
  @Input() type: AlertType = 'info';

  get icon(): string {
    switch (this.type) {
      case 'info':
        return 'feather icon-info';
      case 'warning':
        return 'feather icon-alert-triangle';
      case 'danger':
        return 'feather icon-alert-circle';
      default:
        return 'feather icon-info';
    }
  }
}
