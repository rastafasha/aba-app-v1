import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InsuranceV2, LocationV2, PatientV2 } from 'src/app/core/models';
import { LogFilter } from '../../models';

@Component({
  selector: 'app-log-reports-search',
  templateUrl: './log-reports-search.component.html',
  styleUrls: ['./log-reports-search.component.scss'],
})
export class LogReportsSearchComponent {
  @Input() locations: LocationV2[] = null;
  @Input() insurances: InsuranceV2[] = null;
  @Input() patients: PatientV2[] = null;
  @Output() refresh = new EventEmitter<void>();
  @Output() search = new EventEmitter<LogFilter>();

  filter = {} as LogFilter;

  onRefresh() {
    this.refresh.emit();
    this.filter = {} as LogFilter;
  }
  onSearch() {
    this.search.emit(this.filter);
  }
}
