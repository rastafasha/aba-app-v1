import { NoteRbtV2 } from './note.rbt.v2.model';

export class NoteBcbaV2 {
  type: 'bcba';
  id: number;
  bip_id: number;
  patient_id: number;
  doctor_id: number;
  patient_code: string;
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

  pos: string;

  note_description: string;
  caregiver_goals: CaregiverGoals;
  rbt_training_goals: RbtTrainingGoals;
  location: string;
  location_id: number;
  summary_note: string;
  birth_date: string | Date;
  aba_supervisor: number;
  cpt_code: string;
  diagnosis_code: string;
  rendering_provider: number;
  rendering: Rendering;
  tecnico: TecnicoV2;

  supervisor: SupervisorV2;
  billed: boolean;
  pay: boolean;
  bcba: string;
  md: string;
  md2: string;
  meet_with_client_at: string;
  provider: number;
  status: 'pending' | 'ok' | 'no';

  created_at: string | Date;
  updated_at: string | Date;
  //
  insurance_id: number;
  static build = (data: object): NoteBcbaV2 => ({
    ...data,
    type: 'bcba',
    id: Number(data['id']),
    bip_id: Number(data['bip_id']),
    patient_id: Number(data['patient_id']),
    patient_code: String(data['patient_id']),
    doctor_id: Number(data['doctor_id']),
    note_description: String(data['note_description']),
    caregiver_goals: CaregiverGoalsBuilder(data['caregiver']),
    rbt_training_goals: RbtTrainingGoalsBuilder(data['rbt_training_goals']),
    location: String(data['location']),
    summary_note: String(data['summary_note']),
    birth_date: String(data['birth_date']),
    aba_supervisor: Number(data['aba_supervisor']),
    cpt_code: String(data['cpt_code']),
    diagnosis_code: String(data['diagnosis_code']),
    rendering_provider: Number(data['rendering_provider']),
    rendering: RenderingBuilder(data['rendering']),
    provider_signature: String(data['provider_signature']),
    provider_name: Number(data['provider_name']),
    tecnico: TecnicoV2Builder(data['tecnico']),
    supervisor_signature: String(data['supervisor_signature']),
    supervisor_name: Number(data['supervisor_name']),
    supervisor: SupervisorV2Builder(data['supervisor']),
    billed: Boolean(data['billedbcba']) ?? Boolean(data['billed']),
    pay: Boolean(data['paybcba']) ?? Boolean(data['pay']),
    bcba: String(data['bcba']),
    md: String(data['mdbcba']) ?? String(data['md']),
    md2: String(data['md2bcba']) ?? String(data['md2']),
    meet_with_client_at: data['meet_with_client_at'] as string,
    provider: Number(data['provider']),
    status: (String(data['status']) as 'pending') ?? 'pending',
    location_id: Number(data['location_id']),
    pos: data['pos']?.toString() ?? null,
    session_date: String(data['session_date']),
    time_in: data['time_in'] ? String(data['time_in']) : null,
    time_out: data['time_out'] ? String(data['time_out']) : null,
    time_in2: data['time_in2'] ? String(data['time_in2']) : null,
    time_out2: data['time_out2'] ? String(data['time_out2']) : null,
    session_length_total: String(data['session_length_total']),
    session_length_total2: String(data['session_length_total2']),
    total_hours: String(data['total_hours']),
    total_minutes: Number(data['total_minutes']),
    total_units: Number(data['total_units']),
    created_at: String(data['created_at']),
    updated_at: String(data['updated_at']),
    insurance_id: undefined,
  });
}

export type CaregiverGoals = object;
export type RbtTrainingGoals = object;
export interface Rendering {
  name: string;
  surname: string;
  npi: string;
}

export interface TecnicoV2 {
  name: string;
  surname: string;
  npi: string;
}

export interface SupervisorV2 {
  name: string;
  surname: string;
  npi: string;
}
const CaregiverGoalsBuilder = (data: object): CaregiverGoals => data;
const RbtTrainingGoalsBuilder = (data: object): RbtTrainingGoals => data;
const RenderingBuilder = (data: object): Rendering => ({
  ...data,
  name: String(data['name']),
  npi: String(data['npi']),
  surname: String(data['surname']),
});
const TecnicoV2Builder = (data: object): TecnicoV2 => ({
  ...data,
  name: String(data['name']),
  npi: String(data['npi']),
  surname: String(data['surname']),
});
const SupervisorV2Builder = (data: object): SupervisorV2 => ({
  ...data,
  name: String(data['name']),
  npi: String(data['npi']),
  surname: String(data['surname']),
});

export function isNoteBcbaV2(data: NoteRbtV2 | NoteBcbaV2): data is NoteBcbaV2 {
  return data?.type === 'bcba';
}
