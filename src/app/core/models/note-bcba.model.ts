import { BooleanOrNullOrUndefined, StringOrNullOrUndefined } from 'src/app/shared/utils';
import { NoteRbt } from './note-rbt.model';
import { AssessmentToolType, Protocol, CaregiverGoalProtocol, PlanProtocol, Supervisor, Tecnico, DiscussedPlanProtocol } from './notes.model';

export interface NoteBcba {


  summary_note: string;
  rendering_provider: string;
  type: 'bcba';
  insurance_key: string;
  insurance_id?: number;
  id: number;
  patient_id: string;
  bip_id: number;
  cpt_code: string;

  session_date: string;
  tecnico: Tecnico;
  session_length_total: string;
  total_units: string;
  supervisor_id: number;
  supervisor_name: string;
  supervisor: Supervisor;
  provider_id: number;
  // aba_supervisor: number;
  // abasupervisor: Supervisor;
  xp: number;
  md: string;
  md2: string;
  billed: boolean;
  pay: boolean;
  meet_with_client_at: string;
  unidades_sesion_1: number;
  unidades_sesion_2: number;
  session_units_total: number;
  status: string;
  created_at: string;

  time_in?: string;
  time_in2?: string;

  time_out?: string;
  time_out2?: string;

  provider: ProviderBcba;
  pa_service_id: number;

  // 97151
  subtype?: AssessmentToolType;
  BCBA_conducted_assessments?: boolean;
  BCBA_conducted_client_observations?: boolean;
  assessment_tools?: string[];
  intake_outcome?: string[];

  // 97155
  intervention_protocols?: Protocol[];
  replacement_protocols?: PlanProtocol[];
  modifications_needed_at_this_time?: boolean;
  additional_goals_or_interventions?: string;

  // 97156
  behavior_protocols?: DiscussedPlanProtocol[];
  caregiver_goals?: CaregiverGoalProtocol[];

}

export interface ProviderBcba {
  id: number;
  name: string;
  surname: string | null;
  npi: string | null;
  electronic_signature: string | null;
}

export class NoteBcbaBuilder implements NoteBcba {
  type: 'bcba';
  insurance_key: string;
  insurance_id?: number;
  id: number;
  patient_id: string;
  bip_id: number;
  cpt_code: string;
  session_date: string;
  tecnico: Tecnico;
  session_length_total: string;
  total_units: string;
  supervisor_id: number;
  supervisor_name: string;
  supervisor: Supervisor;
  // aba_supervisor: number;
  // abasupervisor: Supervisor;
  xp: number;
  md: string;
  md2: string;
  billed: boolean;
  pay: boolean;
  meet_with_client_at: string;
  unidades_sesion_1: number;
  unidades_sesion_2: number;
  session_units_total: number;
  status: string;
  created_at: string;

  provider: ProviderBcba;
  provider_id:number;
  pa_service_id:number;

  time_in?: string;
  time_in2?: string;

  time_out?: string;
  time_out2?: string;
  rendering_provider: string;
  summary_note: string;

  // 97151
  subtype?: AssessmentToolType;
  BCBA_conducted_assessments?: boolean;
  BCBA_conducted_client_observations?: boolean;
  assessment_tools?: string[];
  intake_outcome?: string[];

  // 97155
  intervention_protocols?: Protocol[];
  replacement_protocols?: PlanProtocol[];
  modifications_needed_at_this_time?: boolean;
  additional_goals_or_interventions?: string;

  // 97156
  behavior_protocols?: DiscussedPlanProtocol[];
  caregiver_goals?: CaregiverGoalProtocol[];



  constructor(data: Partial<NoteBcba> = {}) {
    this.type = 'bcba';
    this.insurance_key = data.insurance_key || (data as any).insuranceId || '';
    this.insurance_id = data.insurance_id || 0;
    this.provider_id = data.provider_id || 0;
    this.pa_service_id = data.pa_service_id || 0;
    this.id = data.id || 0;
    this.patient_id = data.patient_id || '';
    this.bip_id = data.bip_id || 0;
    this.cpt_code = data.cpt_code || '';
    // this.provider = data.provider || '';
    this.session_date = data.session_date || '';
    this.tecnico = data.tecnico || ({} as Tecnico);
    this.session_length_total = data.session_length_total || '0';
    this.total_units = data.total_units || '0';
    this.supervisor_id = data.supervisor_id || 0;
    this.supervisor_name = data.supervisor_name || '';
    this.supervisor = data.supervisor || ({} as Supervisor);
    // this.aba_supervisor = data.aba_supervisor || 0;
    // this.abasupervisor = data.abasupervisor || ({} as Supervisor);
    this.xp = data.xp || 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.md = data.md || (data as any).mdbcba || '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.md2 = data.md2 || (data as any).md2bcba || null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.billed = data.billed || (data as any).billedbcba || false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.pay = data.pay || (data as any).paybcba || false;
    this.meet_with_client_at = data.meet_with_client_at || '';
    this.unidades_sesion_1 = data.unidades_sesion_1 || 0;
    this.unidades_sesion_2 = data.unidades_sesion_2 || 0;
    this.session_units_total = data.session_units_total || 0;
    this.status = data.status || '';
    this.created_at = data.created_at || new Date().toISOString();
    this.time_in = data.time_in || '';
    this.time_in2 = data.time_in2 || '';
    this.time_out = data.time_out || '';
    this.time_out2 = data.time_out2 || '';
    this.rendering_provider = data.rendering_provider || '';
    this.summary_note = data.summary_note || '';
    this.subtype = data.subtype || 'observation';
    this.BCBA_conducted_assessments = data.BCBA_conducted_assessments;
    this.BCBA_conducted_client_observations = data.BCBA_conducted_client_observations;
    this.assessment_tools = data.assessment_tools || [];
    this.intake_outcome = data.intake_outcome || [];
    this.intervention_protocols = data.intervention_protocols || [];
    this.replacement_protocols = data.replacement_protocols || [];
    this.modifications_needed_at_this_time = BooleanOrNullOrUndefined(data.modifications_needed_at_this_time);
    this.additional_goals_or_interventions = StringOrNullOrUndefined(data.additional_goals_or_interventions);
    this.behavior_protocols = data.behavior_protocols || [];
    this.caregiver_goals = data.caregiver_goals || [];
  }
}

export function isNoteBcba(note: NoteRbt | NoteBcba): note is NoteBcba {
  return note.type === 'bcba';
}
