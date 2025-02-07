import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { RepositoryV2Service } from './repository.v2.service';
import { WeeklyReportV2 } from '../models/v2/weekly-report.v2.model';

@Injectable({ providedIn: 'root' })
export class WeeklyReportsV2Service extends RepositoryV2Service<WeeklyReportV2> {
  constructor(protected http: HttpClient) {
    super(http, url_servicios + '/v2/weekly-reports');
  }

  transform(data: unknown): WeeklyReportV2 {
    return data as WeeklyReportV2;
  }
}
