import { NoteBcbaV2 } from './note-bcba.v2.model';

export class NoteRbtV2 {
  type: 'rbt';
  id: number;
  bip_id: number;
  patient_id: number;
  patient_code: string;
  doctor_id: number;

  provider_id: number;
  provider_name_g: number;
  provider_credential: string;
  provider_signature: string;
  provider_name: number;
  supervisor_signature: string;
  supervisor_name: number;

  session_date: string | Date;
  time_in: string;
  time_out: string;
  time_in2: string;
  time_out2: string;
  session_length_total: string;
  session_length_total2: string;
  total_hours: string;
  total_minutes: number;
  total_units: number;

  environmental_changes: string;
  maladaptives: Maladaptives;
  replacements: Replacements;
  interventions: Interventions;
  meet_with_client_at: string;
  client_appeared: string;
  as_evidenced_by: string;
  rbt_modeled_and_demonstrated_to_caregiver: string;
  client_response_to_treatment_this_session: string;
  progress_noted_this_session_compared_to_previous_session: string;
  next_session_is_scheduled_for: string | Date;

  billed: boolean;
  pay: boolean;
  status: 'pending' | 'ok' | 'no';
  cpt_code: string;
  location_id: number;
  md: string;
  md2: string;
  provider: number;
  created_at: string | Date;
  updated_at: string | Date;
  deleted_at: string | Date;
  pos: string;
  //
  insurance_id: number;
  tecnico: { name: string; surname: number };

  static build = (data: object): NoteRbtV2 => {
    const note = {
      ...data,
      type: 'rbt' as const,
      id: Number(data['id']),
      doctor_id: Number(data['doctor_id']),
      patient_id: Number(data['patient_id']),
      patient_code: data['patient_code']
        ? String(data['patient_code'])
        : String(data['patient_id']),
      bip_id: Number(data['bip_id']),
      provider_name_g: Number(data['provider_name_g']),
      provider_id: Number(data['provider_name_g']), //PUT ATTENTION HERE
      provider_credential:
        data['provider_credential'] && data['provider_credential'] !== 'null'
          ? String(data['provider_credential'])
          : null,
      pos: String(data['pos']),
      session_date: String(data['session_date']),
      time_in: data['time_in'] ? String(data['time_in']) : null,
      time_out: data['time_out'] ? String(data['time_out']) : null,
      time_in2: data['time_in2'] ? String(data['time_in2']) : null,
      time_out2: data['time_out2'] ? String(data['time_out2']) : null,
      session_length_total: this.calculateSessionLength(data),
      session_length_total2: this.calculateSessionLength2(data),
      total_hours: this.calculateTotalHours(data),
      total_minutes: this.calculateTotalMinutes(data),
      total_units: this.calculateTotalUnits(data),
      environmental_changes: String(data['environmental_changes']),
      maladaptives: Object(data['maladaptives']),
      replacements: Object(data['replacements']),
      interventions: Object(data['interventions']),
      meet_with_client_at: String(data['meet_with_client_at']),
      client_appeared: String(data['client_appeared']),
      as_evidenced_by: String(data['as_evidenced_by']),
      rbt_modeled_and_demonstrated_to_caregiver: String(
        data['rbt_modeled_and_demonstrated_to_caregiver']
      ),
      client_response_to_treatment_this_session: String(
        data['client_response_to_treatment_this_session']
      ),
      progress_noted_this_session_compared_to_previous_session: String(
        data['progress_noted_this_session_compared_to_previous_session']
      ),
      next_session_is_scheduled_for: String(
        data['next_session_is_scheduled_for']
      ),
      provider_signature: String(data['provider_signature']),
      provider_name: Number(data['provider_name']),
      supervisor_signature: String(data['supervisor_signature']),
      supervisor_name: Number(data['supervisor_name']),
      billed: Boolean(data['billed']),
      pay: Boolean(data['pay']),
      status: (String(data['status']) as 'pending') ?? 'pending',
      cpt_code: String(data['cpt_code']),
      location_id: Number(data['location_id']),
      md: String(data['md']),
      md2: String(data['md2']),
      provider: Number(data['provider']),
      created_at: String(data['created_at']),
      updated_at: String(data['updated_at']),
      deleted_at: String(data['deleted_at']),
      //
      insurance_id: undefined,
      tecnico: undefined,
    };
    // Post Work
    note.session_length_total = this.calculateSessionLength(data);
    note.session_length_total2 = this.calculateSessionLength2(data);
    note.total_hours = this.calculateTotalHours(data);
    note.total_minutes = this.calculateTotalMinutes(data);
    note.total_units = this.calculateTotalUnits(data);
    // Data Base's Fixes
    note.insurance_id = Number(data['pa_service_id']);

    return note;
  };
  static calculateSessionLength(data: object): string {
    if (data['session_length_total'])
      return String(data['session_length_total']);
    return 0 + '';
  }
  static calculateSessionLength2(data: object): string {
    if (data['session_length_total2'])
      return String(data['session_length_total2']);
    return 0 + '';
  }
  static calculateTotalHours(data: object): string {
    if (data['total_hours']) return String(data['total_hours']);
    return 0 + '';
  }
  static calculateTotalMinutes(data: object): number {
    if (data['total_minutes']) return Number(data['total_minutes']);
    return 0;
  }
  static calculateTotalUnits(data: object): number {
    if (data['total_units']) return Number(data['total_units']);
    return 0;
  }
}

export type Maladaptives = object;
export type Replacements = object;
export type Interventions = object;

export function isNoteRbtV2(data: NoteRbtV2 | NoteBcbaV2): data is NoteRbtV2 {
  return data?.type === 'rbt';
}
