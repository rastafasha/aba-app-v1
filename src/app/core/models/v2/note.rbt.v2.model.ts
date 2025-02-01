import {
  DateOrNullOrUndefined,
  NumberOrNullOrUndefined,
  StringOrNullOrUndefined,
} from 'src/app/shared/utils';
import { NoteBcbaV2 } from './note-bcba.v2.model';

export class NoteRbtV2 {
  type: 'rbt';
  id: number;
  bip_id: number;
  patient_id: number;
  client_id: number;
  patient_code: string;
  patient_identifier: string;
  insurance_identifier: string;
  doctor_id: number;

  provider_id: number;
  provider_name_g: number;
  provider_credential: string;
  provider_signature: string;
  provider_name: number;
  supervisor_signature: string;
  supervisor_name: number;
  supervisor_id: number;

  session_date: string | Date;
  participants: string;
  time_in: string;
  time_out: string;
  time_in2: string;
  time_out2: string;
  session_length_morning_total: number;
  session_length_afternon_total: number;
  session_length_total?: number;
  total_hours: number;
  total_minutes: number;
  total_units: number;

  environmental_changes: string;
  maladaptives: Maladaptives;
  replacements: Replacements;
  interventions: Interventions;
  summary_note: string;
  meet_with_client_at: string;
  client_appeared: string;
  as_evidenced_by: string;
  rbt_modeled_and_demonstrated_to_caregiver: string;
  client_response_to_treatment_this_session: string;
  progress_noted_this_session_compared_to_previous_session: string;
  next_session_is_scheduled_for: string | Date;

  billed: boolean;
  paid: boolean;
  status: 'pending' | 'ok' | 'no';
  cpt_code: string;
  location_id: number;
  md: string;
  md2: string;
  md3: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  pos: string;
  pa_service_id: number;
  //
  insurance_id: number;

  constructor(data: Partial<NoteRbtV2>) {
    if (!data) return null;
    const result = {
      ...data,
      type: 'rbt' as const,
      id: NumberOrNullOrUndefined(data.id),
      doctor_id: NumberOrNullOrUndefined(data.doctor_id),
      patient_id: NumberOrNullOrUndefined(data.patient_id),
      insurance_identifier: StringOrNullOrUndefined(data.insurance_identifier),
      client_id:
        NumberOrNullOrUndefined(data.client_id) ??
        NumberOrNullOrUndefined(data.patient_id),
      patient_code: data.patient_code
        ? StringOrNullOrUndefined(data.patient_code)
        : StringOrNullOrUndefined(data.patient_id),
      patient_identifier: data.patient_identifier
        ? StringOrNullOrUndefined(data.patient_identifier)
        : StringOrNullOrUndefined(data.patient_id),
      bip_id: NumberOrNullOrUndefined(data.bip_id),
      provider_name_g: NumberOrNullOrUndefined(data.provider_name_g),
      provider_id: NumberOrNullOrUndefined(data.provider_id),
      provider_credential:
        data.provider_credential && data.provider_credential !== 'null'
          ? StringOrNullOrUndefined(data.provider_credential)
          : null,
      pos: StringOrNullOrUndefined(data.pos),
      pa_service_id: NumberOrNullOrUndefined(data.pa_service_id),

      session_date: StringOrNullOrUndefined(data.session_date),
      participants: StringOrNullOrUndefined(data.participants),
      time_in: StringOrNullOrUndefined(data.time_in),
      time_out: StringOrNullOrUndefined(data.time_out),
      time_in2: StringOrNullOrUndefined(data.time_in2),
      time_out2: StringOrNullOrUndefined(data.time_out2),
      session_length_morning_total: NoteRbtV2.calculateSessionLength(data),
      session_length_afternon_total: NoteRbtV2.calculateSessionLength2(data),
      total_hours: NoteRbtV2.calculateTotalHours(data),
      total_minutes: NoteRbtV2.calculateTotalMinutes(data),
      total_units: NoteRbtV2.calculateTotalUnits(data),
      environmental_changes: StringOrNullOrUndefined(
        data.environmental_changes
      ),
      maladaptives: Object(data.maladaptives),
      replacements: Object(data.replacements),
      interventions: Object(data.interventions),
      summary_note: StringOrNullOrUndefined(data.summary_note),
      meet_with_client_at: StringOrNullOrUndefined(data.meet_with_client_at),
      client_appeared: StringOrNullOrUndefined(data.client_appeared),
      as_evidenced_by: StringOrNullOrUndefined(data.as_evidenced_by),
      rbt_modeled_and_demonstrated_to_caregiver: StringOrNullOrUndefined(
        data.rbt_modeled_and_demonstrated_to_caregiver
      ),
      client_response_to_treatment_this_session: StringOrNullOrUndefined(
        data.client_response_to_treatment_this_session
      ),
      progress_noted_this_session_compared_to_previous_session:
        StringOrNullOrUndefined(
          data.progress_noted_this_session_compared_to_previous_session
        ),
      next_session_is_scheduled_for: StringOrNullOrUndefined(
        data.next_session_is_scheduled_for
      ),
      provider_signature: StringOrNullOrUndefined(data.provider_signature),
      provider_name: NumberOrNullOrUndefined(data.provider_name),
      supervisor_signature: StringOrNullOrUndefined(data.supervisor_signature),
      supervisor_name: NumberOrNullOrUndefined(data.supervisor_name),
      supervisor_id: NumberOrNullOrUndefined(data.supervisor_id),
      billed: Boolean(data.billed),
      paid: Boolean(data.paid),
      status: (StringOrNullOrUndefined(data.status) as 'pending') ?? 'pending',
      cpt_code: StringOrNullOrUndefined(data.cpt_code),
      location_id: NumberOrNullOrUndefined(data.location_id),
      md: StringOrNullOrUndefined(data.md),
      md2: StringOrNullOrUndefined(data.md2),
      md3: StringOrNullOrUndefined(data.md3),

      created_at: DateOrNullOrUndefined(data.created_at),
      updated_at: DateOrNullOrUndefined(data.updated_at),
      deleted_at: DateOrNullOrUndefined(data.deleted_at),
      //
      insurance_id: NumberOrNullOrUndefined(data.insurance_id),
    };
    // Post Work
    result.session_length_morning_total =
      NoteRbtV2.calculateSessionLength(data);
    result.session_length_afternon_total =
      NoteRbtV2.calculateSessionLength2(data);
    result.session_length_total =
      result.session_length_morning_total +
      result.session_length_afternon_total;

    result.total_hours = NoteRbtV2.calculateTotalHours(data);
    result.total_minutes = NoteRbtV2.calculateTotalMinutes(data);
    result.total_units = NoteRbtV2.calculateTotalUnits(data);
    return result;
  }

  static calculateSessionLength(data: Partial<NoteRbtV2>): number {
    if (data.session_length_morning_total)
      return NumberOrNullOrUndefined(data.session_length_morning_total);
    return 0;
  }
  static calculateSessionLength2(data: Partial<NoteRbtV2>): number {
    if (data.session_length_afternon_total)
      return NumberOrNullOrUndefined(data.session_length_afternon_total);
    return 0;
  }
  static calculateTotalHours(data: Partial<NoteRbtV2>): number {
    if (data.total_hours) return NumberOrNullOrUndefined(data.total_hours);
    return 0;
  }
  static calculateTotalMinutes(data: Partial<NoteRbtV2>): number {
    if (data.total_minutes) return NumberOrNullOrUndefined(data.total_minutes);
    return 0;
  }
  static calculateTotalUnits(data: Partial<NoteRbtV2>): number {
    if (data.total_units) return NumberOrNullOrUndefined(data.total_units);
    return 0;
  }
}

export type Maladaptives = {
  id: number;
  name: string;
  ocurrences: number;
}[];
export type Replacements = {
  id: number;
  name: string;
  total_trials: number;
  correct_responses: number;
}[];
export type Interventions = string[];

export function isNoteRbtV2(data: NoteRbtV2 | NoteBcbaV2): data is NoteRbtV2 {
  return data?.type === 'rbt';
}
