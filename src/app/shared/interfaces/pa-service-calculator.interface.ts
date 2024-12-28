export interface PaServiceCalculatorResponse {
  pa_service_id: string;
  total_units: number;
  average_units_per_week: number;
  used_units_this_week: number;
  remaining_units_this_week: number;
  week_start_date: string;
  week_end_date: string;
}
