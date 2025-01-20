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

  ngOnInit(): void {
    this.getLastWeek()
  }

  getLastWeek(): void {
    const lastSaturday = new Date().getDay() != 6 ? new Date(new Date().setDate(new Date().getDate() - Number(new Date().getDay()) - 1)) : new Date();
    let year = lastSaturday.getFullYear();
    let month = String(lastSaturday.getMonth() + 1).padStart(2, '0');
    let day = String(lastSaturday.getDate()).padStart(2, '0');
    this.filter.date_end = `${year}-${month}-${day}`;

    const previousSunday = new Date().getDay() != 6 ? new Date(new Date().setDate(new Date().getDate() - Number(new Date().getDay()) - 7)) : new Date(new Date().setDate(new Date().getDate() - 7));
    year = previousSunday.getFullYear();
    month = String(previousSunday.getMonth() + 1).padStart(2, '0');
    day = String(previousSunday.getDate()).padStart(2, '0');
    this.filter.date_start = `${year}-${month}-${day}`;

    this.onSearch();
  }

  onRefresh() {
    this.refresh.emit();
    this.filter = {} as LogFilter;
  }
  onSearch() {
    this.search.emit(this.filter);
  }
}
