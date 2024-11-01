import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-log-notas-total',
  templateUrl: './log-notas-total.component.html',
  styleUrls: ['./log-notas-total.component.scss'],
})
export class LogNotasTotalComponent {
  @Input() weekTotalHours = ':';
  @Input() weekTotalUnits = 0;
}
