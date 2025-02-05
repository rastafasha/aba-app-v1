import {
  NumberOrNullOrUndefined,
} from 'src/app/shared/utils';
import { PlanV2 } from './plan.v2.model';

export class WeeklyReportV2 {
  id: number;
  plan_id: number;
  week_start: string | Date;
  week_end: string | Date;
  value: number;
  created_at: string | Date;
  updated_at: string | Date;
  deleted_at: string | Date;
  plan?: PlanV2;

  constructor(data: Partial<WeeklyReportV2>) {
    if (!data) return null;
    const report: WeeklyReportV2 = {
      ...data,
      id: NumberOrNullOrUndefined(data.id),
      plan_id: NumberOrNullOrUndefined(data.plan_id),
      week_start: data.week_start ? new Date(data.week_start) : null,
      week_end: data.week_end ? new Date(data.week_end) : null,
      value: NumberOrNullOrUndefined(data.value),
      created_at: data.created_at ? new Date(data.created_at) : null,
      updated_at: data.updated_at ? new Date(data.updated_at) : null,
      deleted_at: data.deleted_at ? new Date(data.deleted_at) : null,
      plan: data.plan ? new PlanV2(data.plan) : null,
    };
    return report;
  }
}
