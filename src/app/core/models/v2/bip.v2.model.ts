import {
  DateOrNullOrUndefined,
  ForceMap,
  NumberOrNullOrUndefined,
  StringOrNullOrUndefined,
  TypeOrNullOrUndefined,
} from 'src/app/shared/utils';
import { GoalV2 } from './goal.v2.model';
type ObjectiveStatus =
  | 'inprogress'
  | 'initiated'
  | 'mastered'
  | 'on hold'
  | 'discontinued'
  | 'maintenance';
export class Objective {
  id: number;
  name: string;
  maladaptive_id: number;
  status: ObjectiveStatus;
  initial_date: Date;
  end_date: Date;
  description: string;
  target: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  order?: number;
  index?: number;
  constructor(data: Partial<Objective>) {
    Object.assign(this, data);
  }
  static getDefault(): Objective {
    return new Objective({
      id: 0,
      name: '',
      maladaptive_id: 0,
      status: 'inprogress',
      initial_date: new Date(),
      end_date: new Date(),
      description: '',
      target: 0,
      order: 0,
    });
  }
}

export class DocumentV2 {
  index: number;
  title: string;
  constructor(data: Partial<DocumentV2>) {
    Object.assign(this, data);
  }
}

export class Intervention {
  index?: number;
  titleIntervention: string;
  descriptionIntervention: string;
  constructor(data: Partial<Intervention>) {
    Object.assign(this, data);
  }
}

export class Attention {
  index?: number;
  preventive_strategies_a: string;
  replacement_skills_a: string;
  manager_strategies_a: string;
  constructor(data: Partial<Attention>) {
    Object.assign(this, data);
  }
}

export class Escape {
  index?: number;
  preventive_strategies_e: string;
  replacement_skills_e: string;
  manager_strategies_e: string;
  constructor(data: Partial<Escape>) {
    Object.assign(this, data);
  }
}

export class Sensory {
  index?: number;
  preventive_strategies_s: string;
  replacement_skills_s: string;
  manager_strategies_s: string;
  constructor(data: Partial<Sensory>) {
    Object.assign(this, data);
  }
}

export class Tangible {
  index?: number;
  preventive_strategies: string;
  replacement_skills: string;
  manager_strategies: string;
  constructor(data: Partial<Tangible>) {
    Object.assign(this, data);
  }
}

export class PrevalentSettingEventAndAntecedent {
  index?: number;
  prevalent_setting_event_and_atecedent: string;
  behavior: string;
  hypothesized_functions: string;
  constructor(data: Partial<PrevalentSettingEventAndAntecedent>) {
    Object.assign(this, data);
  }
}

export class AssestmentEvaluationSetting {
  index?: number;
  tangible: string;
  activities: string;
  other: string;
  constructor(data: Partial<AssestmentEvaluationSetting>) {
    Object.assign(this, data);
  }
}

export class AssestmentConductedOption {
  index: number;
  assestment_title: string;
  assestment_status: string;
  constructor(data: Partial<AssestmentConductedOption>) {
    Object.assign(this, data);
  }
}

export class MonitoringEvaluating {
  id: number;
  bip_id: number;
  patient_id: string;
  client_id: number;
  treatment_fidelity: string | null;
  rbt_training_goals: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  constructor(data: Partial<MonitoringEvaluating>) {
    Object.assign(this, data);
  }
}

export class Medication {
  index: number;
  medication: string;
  dose: string;
  frecuency: string;
  reason: string;
  preescribing_physician: string;
  constructor(data: Partial<Medication>) {
    Object.assign(this, data);
  }
}

export class Doctor {
  id: number;
  full_name: string;
  avatar: string | null;
  constructor(data: Partial<Doctor>) {
    Object.assign(this, data);
  }
}

export class ConsentToTreatment {
  id: number;
  bip_id: number;
  patient_id: string;
  client_id: number;
  analyst_signature: string;
  analyst_signature_date: string;
  parent_guardian_signature: string;
  parent_guardian_signature_date: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  constructor(data: Partial<ConsentToTreatment>) {
    Object.assign(this, data);
  }
}
export class Recomendation {
  cpt: string;
  nombre: string;
  num_units: number;
  breakdown_per_week: string;
  location: string;
  description_service: string;
  constructor(data: Partial<Recomendation>) {
    Object.assign(this, data);
  }
}

export class DeEscalationTechnique {
  id: number;
  bip_id: number;
  patient_id: string;
  client_id: number;
  description: string | null;
  service_recomendation: string | null;
  recomendation_lists: Recomendation[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  constructor(data: Partial<DeEscalationTechnique>) {
    Object.assign(this, data);
    this.recomendation_lists = ForceMap(
      data.recomendation_lists,
      Recomendation
    );
  }
}

export class CrisisPlan {
  id: number;
  bip_id: number;
  patient_id: string;
  client_id: number;
  crisis_description: string;
  crisis_note: string;
  caregiver_requirements_for_prevention_of_crisis: string;
  risk_factors: RiskFactor[];
  suicidalities: Suicidality[];
  homicidalities: Homicidality[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  constructor(data: Partial<CrisisPlan>) {
    Object.assign(this, data);
    this.risk_factors = ForceMap(data.risk_factors, RiskFactor);
    this.suicidalities = ForceMap(data.suicidalities, Suicidality);
    this.homicidalities = ForceMap(data.homicidalities, Homicidality);
  }
}
export class RiskFactor {
  do_not_apply: boolean;
  elopement: boolean;
  assaultive_behavior: boolean;
  aggression: boolean;
  self_injurious_behavior: boolean;
  sexually_offending_behavior: boolean;
  fire_setting: boolean;
  current_substance_abuse: boolean;
  impulsive_behavior: boolean;
  psychotic_symptoms: boolean;
  self_mutilation_cutting: boolean;
  caring_for_ill_family_recipient: boolean;
  current_family_violence: boolean;
  dealing_with_significant: boolean;
  prior_psychiatric_inpatient_admission: boolean;
  other: string;
  constructor(data: Partial<RiskFactor>) {
    Object.assign(this, data);
  }
}
export class Suicidality {
  not_present: boolean;
  ideation: boolean;
  plan: boolean;
  means: boolean;
  prior_attempt: boolean;
  constructor(data: Partial<Suicidality>) {
    Object.assign(this, data);
  }
}
export class Homicidality {
  not_present_homicidality: boolean;
  ideation_homicidality: boolean;
  plan_homicidality: boolean;
  means_homicidality: boolean;
  prior_attempt_homicidality: boolean;
  constructor(data: Partial<Homicidality>) {
    Object.assign(this, data);
  }
}

export class Sustitution extends GoalV2 {
  stos: Objective[];
  ltos: Objective[];
  constructor(data: Partial<Sustitution>) {
    super(data);
    this.category = 'sustitution';
    this.stos = ForceMap(data.stos, Objective);
    this.ltos = ForceMap(data.ltos, Objective);
  }
}

export class GeneralizationTraining {
  id: number;
  bip_id: number;
  patient_id: string;
  client_id: number;
  discharge_plan: string;
  transition_fading_plans: TransitionFadingPlan[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  constructor(data: Partial<GeneralizationTraining>) {
    Object.assign(this, data);
    this.id = NumberOrNullOrUndefined(data.id);
    this.bip_id = NumberOrNullOrUndefined(data.bip_id);
    this.patient_id = StringOrNullOrUndefined(data.patient_id);
    this.client_id = NumberOrNullOrUndefined(data.client_id);
    this.discharge_plan = StringOrNullOrUndefined(data.discharge_plan);
    this.transition_fading_plans = ForceMap(
      data.transition_fading_plans,
      TransitionFadingPlan
    );
    this.created_at = DateOrNullOrUndefined(data.created_at);
    this.updated_at = DateOrNullOrUndefined(data.updated_at);
    this.deleted_at = DateOrNullOrUndefined(data.deleted_at);
  }
}

export class TransitionFadingPlan {
  phase: string;
  description: string;
  constructor(data: Partial<TransitionFadingPlan>) {
    Object.assign(this, data);
    this.phase = StringOrNullOrUndefined(data.phase);
    this.description = StringOrNullOrUndefined(data.description);
  }
}

export class DocumentReviewed {
  document_title: string;
  document_status: string;
  constructor(data: Partial<DocumentReviewed>) {
    this.document_title = StringOrNullOrUndefined(data.document_title);
    this.document_status = StringOrNullOrUndefined(data.document_status);
  }
}

export class BipV2 {
  id: number;
  type_of_assessment: number;
  doctor_id: number;
  doctor: Doctor;
  patient_identifier: string;
  background_information: string;
  previus_treatment_and_result: string;
  current_treatment_and_progress: string;
  education_status: string;
  phisical_and_medical_status: string;
  phiysical_and_medical: string;
  phisical_and_medical: Medication[];
  assestment_conducted: string | null;
  strengths: string;
  weakneses: string;
  documents_reviewed: DocumentV2[];
  maladaptives: GoalV2[];
  replacements: GoalV2[];
  assestment_conducted_options: AssestmentConductedOption[];
  assestmentEvaluationSettings: AssestmentEvaluationSetting[];
  prevalent_setting_event_and_atecedents: PrevalentSettingEventAndAntecedent[];
  interventions: Intervention[];
  goal_stos: string | null;
  goal_ltos: string | null;
  hypothesis_based_intervention: string | null;
  tangibles: Tangible[];
  attention: Attention[];
  escape: Escape[];
  sensory: Sensory[];
  reduction_goal: GoalV2[];
  sustitution_goal: Sustitution[];
  family_envolment: GoalV2[];
  family_envolments: GoalV2[];
  rbt_training_goals: GoalV2[];
  monitoring_evalutating: MonitoringEvaluating[];
  monitoring_evalutatings: MonitoringEvaluating[];
  generalization_training: GeneralizationTraining[];
  crisis_plan: CrisisPlan[];
  de_escalation_technique: DeEscalationTechnique[];
  consent_to_treatment: ConsentToTreatment;
  created_at?: Date;

  constructor(data: Partial<BipV2>) {
    const self: BipV2 = {
      ...data,
      id: NumberOrNullOrUndefined(data.id),
      type_of_assessment: NumberOrNullOrUndefined(data.type_of_assessment),
      doctor_id: NumberOrNullOrUndefined(data.doctor_id),
      doctor: TypeOrNullOrUndefined(data.doctor, Doctor),
      patient_identifier: StringOrNullOrUndefined(data.patient_identifier),
      phiysical_and_medical: StringOrNullOrUndefined(data.phisical_and_medical),
      maladaptives: ForceMap(data.maladaptives, GoalV2),
      replacements: ForceMap(data.replacements, GoalV2),
      strengths: StringOrNullOrUndefined(data.strengths),
      weakneses: StringOrNullOrUndefined(data.weakneses),
      assestmentEvaluationSettings: ForceMap(
        data.assestmentEvaluationSettings,
        AssestmentEvaluationSetting
      ),
      assestment_conducted_options: ForceMap(
        data.assestment_conducted_options,
        AssestmentConductedOption
      ),
      assestment_conducted: StringOrNullOrUndefined(data.assestment_conducted),
      background_information: StringOrNullOrUndefined(
        data.background_information
      ),
      current_treatment_and_progress: StringOrNullOrUndefined(
        data.current_treatment_and_progress
      ),
      education_status: StringOrNullOrUndefined(data.education_status),
      family_envolment: ForceMap(data.family_envolment, GoalV2),
      family_envolments: ForceMap(data.family_envolments, GoalV2),
      goal_ltos: StringOrNullOrUndefined(data.goal_ltos),
      goal_stos: StringOrNullOrUndefined(data.goal_stos),
      hypothesis_based_intervention: StringOrNullOrUndefined(
        data.hypothesis_based_intervention
      ),
      interventions: ForceMap(data.interventions, Intervention),
      monitoring_evalutating: ForceMap(
        data.monitoring_evalutating,
        MonitoringEvaluating
      ),
      monitoring_evalutatings: ForceMap(
        data.monitoring_evalutatings,
        MonitoringEvaluating
      ),
      phisical_and_medical: ForceMap(data.phisical_and_medical, Medication),
      phisical_and_medical_status: StringOrNullOrUndefined(
        data.phisical_and_medical_status
      ),
      previus_treatment_and_result: StringOrNullOrUndefined(
        data.previus_treatment_and_result
      ),
      rbt_training_goals: ForceMap(data.rbt_training_goals, GoalV2),
      reduction_goal: ForceMap(data.reduction_goal, GoalV2),
      sensory: ForceMap(data.sensory, Sensory),
      sustitution_goal: ForceMap(data.sustitution_goal, Sustitution),
      tangibles: ForceMap(data.tangibles, Tangible),
      attention: ForceMap(data.attention, Attention),
      escape: ForceMap(data.escape, Escape),
      de_escalation_technique: ForceMap(
        data.de_escalation_technique,
        DeEscalationTechnique
      ),
      consent_to_treatment: TypeOrNullOrUndefined(
        data.consent_to_treatment,
        ConsentToTreatment
      ),
      documents_reviewed: ForceMap(data.documents_reviewed, DocumentV2),
      generalization_training: ForceMap(
        data.generalization_training,
        GeneralizationTraining
      ),
      crisis_plan: ForceMap(data.crisis_plan, CrisisPlan),
      prevalent_setting_event_and_atecedents: ForceMap(
        data.prevalent_setting_event_and_atecedents,
        PrevalentSettingEventAndAntecedent
      ),
    };
    return self;
  }
}
