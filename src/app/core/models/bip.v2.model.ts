import {
  compareObjects,
  ForceArray,
  NumberOrNullOrUndefined,
  StringOrNullOrUndefined,
} from 'src/app/shared/utils';
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
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  order?: number;
  index?: number;
  constructor(data: Partial<Objective>) {
    Object.assign(this, data);
  }
}

export class Goal {
  id: number;
  bip_id: number;
  patient_identifier: string;
  client_id: number;
  current_status: 'active' | 'inactive';
  maladaptive: string;
  baseline: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: string;
  long_term_objective: Objective;
  short_term_objectives: Objective[];
  constructor(data: Partial<Goal>) {
    Object.assign(this, data);
  }
}

export class Maladaptive {
  index?: number;
  baseline_date: Date;
  baseline_level: number;
  current_intensity?: number;
  initial_intensity: number;
  name: string;
  description: string;
  constructor(data: Partial<Maladaptive>) {
    Object.assign(this, data);
    this.name = data.name ?? data['maladaptive_behavior'];
    this.description = data.description ?? data['topografical_definition'];
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
export class FamilyEnvolment {
  id: number;
  bip_id: number;
  patient_identifier: string;
  client_id: number;
  caregivers_training_goals: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  constructor(data: Partial<FamilyEnvolment>) {
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
  documents_reviewed: {
    index: number;
    title: string;
  }[];
  maladaptives: Maladaptive[];
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
  reduction_goal: Goal[];
  sustitution_goal: Goal[];
  family_envolment: FamilyEnvolment[];
  monitoring_evalutating: MonitoringEvaluating[];
  generalization_training: any[];
  crisis_plan: any[];
  de_escalation_technique: any[];
  consent_to_treatment: any[];
  created_at?: string;

  constructor(data: Partial<BipV2>) {
    const result: BipV2 = {
      ...data,
      id: NumberOrNullOrUndefined(data.id),
      type_of_assessment: NumberOrNullOrUndefined(data.type_of_assessment),
      doctor_id: NumberOrNullOrUndefined(data.doctor_id),
      doctor: new Doctor(data.doctor),
      patient_identifier: StringOrNullOrUndefined(data.patient_identifier),
      phiysical_and_medical: StringOrNullOrUndefined(data.phisical_and_medical),
      maladaptives: ForceArray(data.maladaptives).map(
        (item) => new Maladaptive(item)
      ),
      strengths: StringOrNullOrUndefined(data.strengths),
      weakneses: StringOrNullOrUndefined(data.weakneses),
      assestmentEvaluationSettings: ForceArray(
        data.assestmentEvaluationSettings
      ).map((item) => new AssestmentEvaluationSetting(item)),
      assestment_conducted_options: ForceArray(
        data.assestment_conducted_options
      ).map((item) => new AssestmentConductedOption(item)),
      assestment_conducted: StringOrNullOrUndefined(data.assestment_conducted),
      background_information: StringOrNullOrUndefined(
        data.background_information
      ),
      current_treatment_and_progress: StringOrNullOrUndefined(
        data.current_treatment_and_progress
      ),
      education_status: StringOrNullOrUndefined(data.education_status),
      family_envolment: ForceArray(data.family_envolment).map(
        (item) => new FamilyEnvolment(item)
      ),
      goal_ltos: StringOrNullOrUndefined(data.goal_ltos),
      goal_stos: StringOrNullOrUndefined(data.goal_stos),
      hypothesis_based_intervention: StringOrNullOrUndefined(
        data.hypothesis_based_intervention
      ),
      interventions: ForceArray(data.interventions).map(
        (item) => new Intervention(item)
      ),
      monitoring_evalutating: ForceArray(data.monitoring_evalutating).map(
        (item) => new MonitoringEvaluating(item)
      ),
      phisical_and_medical: ForceArray(data.phisical_and_medical).map(
        (item) => new Medication(item)
      ),
      phisical_and_medical_status: StringOrNullOrUndefined(
        data.phisical_and_medical_status
      ),
      previus_treatment_and_result: StringOrNullOrUndefined(
        data.previus_treatment_and_result
      ),
      reduction_goal: ForceArray(data.reduction_goal).map(
        (item) => new Goal(item)
      ),
      sensory: ForceArray(data.sensory).map((item) => new Sensory(item)),
      sustitution_goal: ForceArray(data.sustitution_goal).map(
        (item) => new Goal(item)
      ),
      tangibles: ForceArray(data.tangibles).map((item) => new Tangible(item)),
      attention: ForceArray(data.attention).map((item) => new Attention(item)),
      escape: ForceArray(data.escape).map((item) => new Escape(item)),
      de_escalation_technique: ForceArray(data.de_escalation_technique),
      consent_to_treatment: ForceArray(data.consent_to_treatment),
      documents_reviewed: ForceArray(data.documents_reviewed),
      generalization_training: ForceArray(data.generalization_training),
      crisis_plan: ForceArray(data.crisis_plan),
      prevalent_setting_event_and_atecedents: ForceArray(
        data.prevalent_setting_event_and_atecedents ?? []
      ).map((item) => new PrevalentSettingEventAndAntecedent(item)),
    };
    // console.table(compareObjects(result, data));
    return result;
  }
}
