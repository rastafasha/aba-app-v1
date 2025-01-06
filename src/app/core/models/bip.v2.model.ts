import { Maladaptive } from 'src/app/pages/dashboard/models/dashboard.models';
export type Intervention = {
  index?: number;
  titleIntervention: string;
  descriptionIntervention: string;
};
export type Attention = {
  index?: number;
  preventive_strategies_a: string;
  replacement_skills_a: string;
  manager_strategies_a: string;
};

export type Escape = {
  index?: number;
  preventive_strategies_e: string;
  replacement_skills_e: string;
  manager_strategies_e: string;
};

export type Sensory = {
  index?: number;
  preventive_strategies_s: string;
  replacement_skills_s: string;
  manager_strategies_s: string;
};
export type Tangible = {
  index?: number;
  preventive_strategies: string;
  replacement_skills: string;
  manager_strategies: string;
};
export type PrevalentSettingEventAndAntecedent = {
  index?: number;
  prevalent_setting_event_and_atecedent: string;
  behavior: string;
  hypothesized_functions: string;
};
export type AssestmentEvaluationSetting = {
  index?: number;
  tangible: string;
  activities: string;
  other: string;
};
export type AssestmentConductedOption = {
  index: number;
  assestment_title: string;
  assestment_status: string;
};
export type Medication = {
  index: number;
  medication: string;
  dose: string;
  frecuency: string;
  reason: string;
  preescribing_physician: string;
};
export class BipV2 {
  id: number;
  type_of_assessment: number;
  doctor_id: number;
  doctor: {
    id: number;
    full_name: string;
    avatar: string | null;
  };
  patient_identifier: string;
  background_information: string;
  previus_treatment_and_result: string;
  current_treatment_and_progress: string;
  education_status: string;
  phisical_and_medical_status: string;
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
  reduction_goal: object[];
  sustitution_goal: {
    id: number;
    goal: string;
    current_status: string;
    description: string;
    patient_identifier: string;
    client_id: number;
    bip_id: number;
    goalstos: string;
    goalltos: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  }[];
  family_envolment: {
    id: number;
    bip_id: number;
    patient_identifier: string;
    client_id: number;
    caregivers_training_goals: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  }[];
  monitoring_evalutating: {
    id: number;
    bip_id: number;
    patient_identifier: string;
    client_id: number;
    treatment_fidelity: string | null;
    rbt_training_goals: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  }[];
  generalization_training: any[];
  crisis_plan: any[];
  de_escalation_technique: any[];
  consent_to_treatment: any[];
  created_at: string;

  constructor(data: Partial<BipV2>) {
    Object.assign(this, data);
  }
}
