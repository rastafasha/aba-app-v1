import {
  DateOrNullOrUndefined,
  NumberOrNullOrUndefined,
  StringOrNullOrUndefined,
} from 'src/app/shared/utils';

export class PaServiceV2 {
  id: number;
  patient_id: number;
  pa_service: string;
  cpt: string;
  n_units: number;
  spent_units: number;
  start_date: Date;
  end_date: Date;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  deleted?: boolean;
  available_units?: number;
  constructor(data: Partial<PaServiceV2>) {
    if (!data) return null;
    const result: PaServiceV2 = {
      ...data,
      id: NumberOrNullOrUndefined(data.id),
      patient_id: NumberOrNullOrUndefined(data.patient_id),
      pa_service: StringOrNullOrUndefined(data.pa_service),
      cpt: StringOrNullOrUndefined(data.cpt),
      n_units: NumberOrNullOrUndefined(data.n_units),
      available_units: NumberOrNullOrUndefined(data.available_units),
      spent_units: NumberOrNullOrUndefined(data.spent_units),
      start_date: DateOrNullOrUndefined(data.start_date),
      end_date: DateOrNullOrUndefined(data.end_date),
      created_at: DateOrNullOrUndefined(data.created_at),
      updated_at: DateOrNullOrUndefined(data.updated_at),
      deleted_at: DateOrNullOrUndefined(data.deleted_at),
    };
    return result;
  }
}
