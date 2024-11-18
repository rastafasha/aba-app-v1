export interface LogFilter {
  page?: number;
  location_id: number;
  insurance_id: number;
  patient_id: string;
  note_type: 'rbt' | 'bcba' | null;
  status_type: string;
  date_start: number | string;
  date_end: number | string;
}
