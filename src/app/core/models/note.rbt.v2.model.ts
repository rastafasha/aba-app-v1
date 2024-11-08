export class NoteRbtV2 {
  type: 'rbt';
  id: number;
  doctor_id: number;
  patient_id: string;
  bip_id: number;
  provider_name_g: number;
  provider_credential: string;
  pos: string;
  session_date: string | Date;
  time_in: string;
  time_out: string;
  time_in2: string;
  time_out2: string;
  session_length_total: number;
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
  provider_signature: string;
  provider_name: number;
  supervisor_signature: string;
  supervisor_name: number;
  billed: boolean;
  pay: boolean;
  status: 'pending' | 'ok';
  cpt_code: string;
  location_id: number;
  md: string;
  md2: string;
  provider: number;
  created_at: string | Date;
  updated_at: string | Date;
  deleted_at: string | Date;
  static build = (data: object): NoteRbtV2 => ({
    ...data,
    type: 'rbt',
    id: Number(data['id']),
    doctor_id: Number(data['doctor_id']),
    patient_id: String(data['patient_id']),
    bip_id: Number(data['bip_id']),
    provider_name_g: Number(data['provider_name_g']),
    provider_credential: String(data['provider_credential']),
    pos: String(data['pos']),
    session_date: String(data['session_date']),
    time_in: String(data['time_in']),
    time_out: String(data['time_out']),
    time_in2: String(data['time_in2']),
    time_out2: String(data['time_out2']),
    session_length_total:
      Number(data['session_length_total']) || this.calculateSessionLength(data),
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
    status: (String(data['pay']) as 'pending') ?? 'pending',
    cpt_code: String(data['cpt_code']),
    location_id: Number(data['location_id']),
    md: String(data['md']),
    md2: String(data['md2']),
    provider: Number(data['provider']),
    created_at: String(data['created_at']),
    updated_at: String(data['updated_at']),
    deleted_at: String(data['deleted_at']),
  });
  static calculateSessionLength(data: object): number {
    return 0;
  }
}

export type Maladaptives = object;
export type Replacements = object;
export type Interventions = object;
