import {
  NumberOrNullOrUndefined,
  StringOrNullOrUndefined,
} from 'src/app/shared/utils';
import { LocationV2 } from './location.v2.model';
import { NoteRbtV2 } from './note.rbt.v2.model';
import { ProviderV2 } from './provider.v2.model';

export class NoteBcbaV2 {
  type: 'bcba';
  id: number;
  bip_id: number;
  client_id: number;
  patient_id: string;

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
  session_length_total: number;
  total_hours: string;
  total_minutes: number;
  total_units: number;

  pos: string;

  note_description: string;
  caregiver_goals: CaregiverGoals;
  rbt_training_goals: RbtTrainingGoals;
  location: LocationV2;
  location_id: number;
  summary_note: string;
  birth_date: string | Date;
  aba_supervisor: number;
  cpt_code: string;
  diagnosis_code: string;
  rendering_provider: number;
  provider: ProviderV2;
  supervisor: ProviderV2;
  billed: boolean;
  paid: boolean;
  bcba: string;
  md: string;
  md2: string;
  meet_with_client_at: string;
  status: 'pending' | 'ok' | 'no';

  created_at: string | Date;
  updated_at: string | Date;
  //
  insurance_id: number;
  constructor(data: Partial<NoteBcbaV2>) {
    const note: NoteBcbaV2 = {
      ...data,
      type: 'bcba',
      id: NumberOrNullOrUndefined(data.id),
      bip_id: NumberOrNullOrUndefined(data.bip_id),
      patient_id: data.patient_id,
      client_id: NumberOrNullOrUndefined(data.client_id),
      patient_code: StringOrNullOrUndefined(data.patient_id),
      doctor_id: NumberOrNullOrUndefined(data.doctor_id),
      note_description: StringOrNullOrUndefined(data.note_description),
      caregiver_goals: CaregiverGoalsBuilder(data.caregiver_goals),
      rbt_training_goals: RbtTrainingGoalsBuilder(data.rbt_training_goals),
      location: new LocationV2(data.location),
      summary_note: StringOrNullOrUndefined(data.summary_note),
      birth_date: StringOrNullOrUndefined(data.birth_date),
      aba_supervisor: NumberOrNullOrUndefined(data.aba_supervisor),
      cpt_code: StringOrNullOrUndefined(data.cpt_code),
      diagnosis_code: StringOrNullOrUndefined(data.diagnosis_code),
      rendering_provider: NumberOrNullOrUndefined(data.rendering_provider),
      provider_signature: StringOrNullOrUndefined(data.provider_signature),
      provider_name: NumberOrNullOrUndefined(data.provider_name),
      supervisor_signature: StringOrNullOrUndefined(data.supervisor_signature),
      supervisor_name: NumberOrNullOrUndefined(data.supervisor_name),
      supervisor: data.supervisor,
      billed: Boolean(data.billed),
      paid: Boolean(data.paid),
      bcba: StringOrNullOrUndefined(data.bcba),
      md: StringOrNullOrUndefined(data.md),
      md2: StringOrNullOrUndefined(data.md2),
      meet_with_client_at: data.meet_with_client_at as string,
      provider: data.provider,
      status: (StringOrNullOrUndefined(data.status) as 'pending') ?? 'pending',
      location_id: NumberOrNullOrUndefined(data.location_id),
      pos: StringOrNullOrUndefined(data.pos),
      session_date: StringOrNullOrUndefined(data.session_date),
      time_in: StringOrNullOrUndefined(data.time_in),
      time_out: StringOrNullOrUndefined(data.time_out),
      time_in2: StringOrNullOrUndefined(data.time_in2),
      time_out2: StringOrNullOrUndefined(data.time_out2),
      session_length_total: NumberOrNullOrUndefined(data.session_length_total),
      total_hours: StringOrNullOrUndefined(data.total_hours),
      total_minutes: NumberOrNullOrUndefined(data.total_minutes),
      total_units: NumberOrNullOrUndefined(data.total_units),
      created_at: StringOrNullOrUndefined(data.created_at),
      updated_at: StringOrNullOrUndefined(data.updated_at),
      insurance_id: NumberOrNullOrUndefined(data.insurance_id),
    };
    return note;
  }
}

export type CaregiverGoals = object[];
export type RbtTrainingGoals = object[];

const CaregiverGoalsBuilder = (data: object[]): CaregiverGoals => data;
const RbtTrainingGoalsBuilder = (data: object[]): RbtTrainingGoals => data;

export function isNoteBcbaV2(data: NoteRbtV2 | NoteBcbaV2): data is NoteBcbaV2 {
  return data?.type === 'bcba';
}
