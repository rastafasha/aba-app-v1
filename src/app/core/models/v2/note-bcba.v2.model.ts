import {
  BooleanOrNullOrUndefined,
  DateOrNullOrUndefined,
  NumberOrNullOrUndefined,
  StringOrNullOrUndefined,
} from 'src/app/shared/utils';
import { NoteRbtV2 } from './note.rbt.v2.model';

type NoteStatus = 'pending' | 'ok' | 'no';
export class NoteBcbaV2 {
  type: 'bcba';
  id: number;
  bip_id: number;
  client_id: number;
  patient_id: number;
  insurance_identifier: string;
  patient_identifier: string;
  participants: string;
  environmental_changes: string;

  doctor_id: number;
  patient_code: string;
  provider_signature: string;
  provider_name: number;
  provider_id: number;
  supervisor_signature: string;
  supervisor_name: number;
  supervisor_id: number;

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
  pa_service_id: number;

  note_description: string;
  caregiver_goals: CaregiverGoals;
  rbt_training_goals: RbtTrainingGoals;
  location_id: number;
  summary_note: string;
  birth_date: string | Date;
  aba_supervisor: number;
  cpt_code: string;
  diagnosis_code: string;
  rendering_provider: number;
  billed: boolean;
  paid: boolean;
  bcba: string;
  md: string;
  md2: string;
  md3: string;
  meet_with_client_at: string;
  status: NoteStatus;

  created_at: Date;
  updated_at: Date;
  deleted_at: Date;

  // 97151
  subtype?: string;
  assessment_tools?: string[];
  intake_outcome?: string[];
  BCBA_conducted_client_observations?: boolean;
  BCBA_conducted_assessments?: boolean;

  // 97155
  replacement_protocols?: ReplacementProtocols;
  intervention_protocols?: InterventionProtocols;
  modifications_needed_at_this_time?: boolean;
  additional_goals_or_interventions?: string;

  //
  insurance_id: number;
  constructor(data: Partial<NoteBcbaV2>) {
    if (!data) return null;
    const result: NoteBcbaV2 = {
      ...data,
      type: 'bcba',
      id: NumberOrNullOrUndefined(data.id),
      bip_id: NumberOrNullOrUndefined(data.bip_id),
      patient_id: NumberOrNullOrUndefined(data.patient_id),
      insurance_identifier: StringOrNullOrUndefined(data.insurance_identifier),
      client_id:
        NumberOrNullOrUndefined(data.client_id) ??
        NumberOrNullOrUndefined(data.patient_id),
      participants: StringOrNullOrUndefined(data.participants),
      environmental_changes: StringOrNullOrUndefined(data.environmental_changes),

      patient_code: StringOrNullOrUndefined(data.patient_id),
      patient_identifier: StringOrNullOrUndefined(data.patient_identifier),
      doctor_id: NumberOrNullOrUndefined(data.doctor_id),
      note_description: StringOrNullOrUndefined(data.note_description),
      caregiver_goals: CaregiverGoalsBuilder(data.caregiver_goals),
      rbt_training_goals: RbtTrainingGoalsBuilder(data.rbt_training_goals),
      summary_note: StringOrNullOrUndefined(data.summary_note),
      birth_date: StringOrNullOrUndefined(data.birth_date),
      aba_supervisor: NumberOrNullOrUndefined(data.aba_supervisor),
      cpt_code: StringOrNullOrUndefined(data.cpt_code),
      diagnosis_code: StringOrNullOrUndefined(data.diagnosis_code),
      rendering_provider: NumberOrNullOrUndefined(data.rendering_provider),

      provider_signature: StringOrNullOrUndefined(data.provider_signature),
      provider_name: NumberOrNullOrUndefined(data.provider_name),
      provider_id: NumberOrNullOrUndefined(data.provider_id),

      supervisor_signature: StringOrNullOrUndefined(data.supervisor_signature),
      supervisor_name: NumberOrNullOrUndefined(data.supervisor_name),
      supervisor_id: NumberOrNullOrUndefined(data.supervisor_id),
      billed: Boolean(data.billed),
      paid: Boolean(data.paid),
      bcba: StringOrNullOrUndefined(data.bcba),
      md: StringOrNullOrUndefined(data.md),
      md2: StringOrNullOrUndefined(data.md2),
      md3: StringOrNullOrUndefined(data.md3),
      meet_with_client_at: data.meet_with_client_at as string,
      status: (StringOrNullOrUndefined(data.status) as NoteStatus) ?? 'pending',
      location_id: NumberOrNullOrUndefined(data.location_id),

      pos: StringOrNullOrUndefined(data.pos),
      pa_service_id: NumberOrNullOrUndefined(data.pa_service_id),

      session_date: StringOrNullOrUndefined(data.session_date),
      time_in: StringOrNullOrUndefined(data.time_in),
      time_out: StringOrNullOrUndefined(data.time_out),
      time_in2: StringOrNullOrUndefined(data.time_in2),
      time_out2: StringOrNullOrUndefined(data.time_out2),
      session_length_total: NumberOrNullOrUndefined(data.session_length_total),
      total_hours: StringOrNullOrUndefined(data.total_hours),
      total_minutes: NumberOrNullOrUndefined(data.total_minutes),
      total_units: NumberOrNullOrUndefined(data.total_units),
      created_at: DateOrNullOrUndefined(data.created_at),
      updated_at: DateOrNullOrUndefined(data.updated_at),
      deleted_at: DateOrNullOrUndefined(data.deleted_at),
      insurance_id: NumberOrNullOrUndefined(data.insurance_id),

      // 97151
      subtype: StringOrNullOrUndefined(data.subtype),
      assessment_tools: data.assessment_tools,
      intake_outcome: data.intake_outcome,
      BCBA_conducted_client_observations: BooleanOrNullOrUndefined(data.BCBA_conducted_client_observations),
      BCBA_conducted_assessments: BooleanOrNullOrUndefined(data.BCBA_conducted_assessments),

      // 97155
      replacement_protocols: ReplacementProtocolsBuilder(data.replacement_protocols),
      intervention_protocols: InterventionProtocolsBuilder(data.intervention_protocols),
      modifications_needed_at_this_time: BooleanOrNullOrUndefined(data.modifications_needed_at_this_time),
      additional_goals_or_interventions: StringOrNullOrUndefined(data.additional_goals_or_interventions),
    };
    return result;
  }
}

export type CaregiverGoals = object[];
export type RbtTrainingGoals = object[];
export type ReplacementProtocols = object[];
export type InterventionProtocols = object[];

const CaregiverGoalsBuilder = (data: object[]): CaregiverGoals => data;
const RbtTrainingGoalsBuilder = (data: object[]): RbtTrainingGoals => data;
const ReplacementProtocolsBuilder = (data: object[]): ReplacementProtocols => data;
const InterventionProtocolsBuilder = (data: object[]): InterventionProtocols => data;

export function isNoteBcbaV2(data: NoteRbtV2 | NoteBcbaV2): data is NoteBcbaV2 {
  return data?.type === 'bcba';
}
