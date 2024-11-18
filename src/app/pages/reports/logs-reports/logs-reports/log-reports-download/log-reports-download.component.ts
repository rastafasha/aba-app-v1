import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LogReportsDownloadButtonOptions } from './LogReportsDownloadButtonOptions';
import { LogReportsDownloadOptions } from './LogReportsDownloadOptions';

@Component({
  selector: 'app-log-reports-download',
  templateUrl: './log-reports-download.component.html',
  styleUrls: ['./log-reports-download.component.scss'],
})
export class LogReportsDownloadComponent {
  @Input() options: LogReportsDownloadOptions = {
    buttons: [{ title: '', type: 'txt' }],
  };
  @Output() export = new EventEmitter<LogReportsDownloadButtonOptions>();

  onExport(button: LogReportsDownloadButtonOptions) {
    this.export.emit(button);
  }
}
