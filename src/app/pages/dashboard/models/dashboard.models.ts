import { Maladaptive } from 'src/app/core/models';

export interface PaAssessment {
  id: number;
  patient_id: string;
  assessment_type: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MonitoringEvaluating {
  id: number;
  bip_id: number;
  patient_id: string;
  client_id: number;
  treatment_fidelity: string | null;
  rbt_training_goals: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GeneralizationTraining {
  id: number;
  bip_id: number;
  patient_id: string;
  client_id: number;
  discharge_plan: string;
  transition_fading_plans: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CrisisPlan {
  id: number;
  bip_id: number;
  patient_id: string;
  client_id: number;
  crisis_description: string;
  crisis_note: string;
  caregiver_requirements_for_prevention_of_crisis: string;
  risk_factors: string;
  suicidalities: string;
  homicidalities: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface DeEscalationTechnique {
  id: number;
  bip_id: number;
  patient_id: string;
  client_id: number;
  description: string | null;
  service_recomendation: string | null;
  recomendation_lists: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ConsentToTreatment {
  id: number;
  bip_id: number;
  patient_id: string;
  client_id: number;
  analyst_signature: string;
  analyst_signature_date: string;
  parent_guardian_signature: string;
  parent_guardian_signature_date: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Tangible {
  index: number;
  manager_strategies: string;
  replacement_skills: string;
  preventive_strategies: string;
}

export interface Attention {
  index: number;
  manager_strategies_a: string;
  replacement_skills_a: string;
  preventive_strategies_a: string;
}

export interface Escape {
  index: number;
  manager_strategies_e: string;
  replacement_skills_e: string;
  preventive_strategies_e: string;
}

export interface Sensory {
  index: number;
  manager_strategies_s: string;
  replacement_skills_s: string;
  preventive_strategies_s: string;
}

export interface DocumentReviewed {
  document_title: string;
  document_status: string;
}

export interface RecentPatient {
  id: number;
  location_id: number;
  patient_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  language: string;
  parent_guardian_name: string;
  relationship: string;
  home_phone: string;
  work_phone: string;
  school_name: string;
  school_number: string;
  zip: string;
  state: string;
  address: string;
  gender: number;
  birth_date: string;
  age: string;
  avatar: string;
  city: string;
  education: string;
  profession: string;
  schedule: string;
  summer_schedule: string;
  special_note: string;
  insurer_id: number;
  insuranceId: string;
  eqhlid: string;
  elegibility_date: string;
  pos_covered: string;
  deductible_individual_I_F: string;
  balance: string;
  coinsurance: string;
  copayments: string;
  oop: string;
  diagnosis_code: string;
  status: string;
  patient_control: string;
  pa_assessments: PaAssessment; // Define if needed
  compayment_per_visit: string | null;
  insurer_secundary: string | null;
  welcome: string;
  consent: string;
  insurance_card: string;
  mnl: string;
  referral: string;
  ados: string;
  iep: string;
  asd_diagnosis: string;
  cde: string;
  submitted: string;
  eligibility: string;
  interview: string;
  rbt_home_id: number;
  rbt2_school_id: number;
  bcba_home_id: number;
  bcba2_school_id: number;
  clin_director_id: number;
  telehealth: string;
  pay: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AssessmentConductedOption {
  assessment_title: string;
  assessment_status: string;
}

export interface AssessmentEvaluationSetting {
  index: number;
  other: string;
  tangible: string;
  activities: string;
}

export interface Intervention {
  index: number;
  nombre: string;
  titleIntervention: string;
  descriptionIntervention: string;
}

export interface Goal {
  id: number;
  maladaptive: string;
  current_status: string;
  patient_id: string;
  client_id: number | null;
  bip_id: number;
  goalstos: string;
  goalltos: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface FamilyInvolvement {
  id: number;
  bip_id: number;
  patient_id: string;
  client_id: number;
  caregivers_training_goals: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Tangible {
  index: number;
  manager_strategies: string;
  replacement_skills: string;
  preventive_strategies: string;
}

export interface Attention {
  index: number;
  manager_strategies_a: string;
  replacement_skills_a: string;
  preventive_strategies_a: string;
}

export interface Escape {
  index: number;
  manager_strategies_e: string;
  replacement_skills_e: string;
  preventive_strategies_e: string;
}

export interface Sensory {
  index: number;
  manager_strategies_s: string;
  replacement_skills_s: string;
  preventive_strategies_s: string;
}

export interface PhysicalAndMedicalStatus {
  dose: string;
  nombre: string;
  reason: string;
  frequency: string;
  medication: string;
  prescribing_physician: string;
}

export interface Bip {
  id: number;
  type_of_assessment: number;
  doctor_id: number;
  doctor: {
    id: number;
    full_name: string;
    avatar: string;
  };
  patient_id: string;
  background_information: string;
  previus_treatment_and_result: string;
  current_treatment_and_progress: string;
  education_status: string;
  phisical_and_medical_status: string;
  assessment_conducted: string;
  strengths: string;
  weaknesses: string;
  documents_reviewed: DocumentReviewed[];
  maladaptives: Maladaptive[];
  assessment_conducted_options: AssessmentConductedOption[];
  assessmentEvaluationSettings: AssessmentEvaluationSetting[];
  interventions: Intervention[];
  goal_stos: string | null;
  goal_ltos: string | null;
  hypothesis_based_intervention: string;
  tangibles: Tangible[];
  attention: Attention[];
  escape: Escape[];
  sensory: Sensory | null;
  phiysical_and_medical: string;
  phiysical_and_medical_status: PhysicalAndMedicalStatus[]; // Define if needed
  reduction_goal: Goal[];
  sustitution_goal: Goal[];
  family_envolment: FamilyInvolvement[];
  monitoring_evalutating: MonitoringEvaluating[]; // Define if needed
  generalization_training: GeneralizationTraining[]; // Define if needed
  crisis_plan: CrisisPlan[]; // Define if needed
  de_escalation_technique: DeEscalationTechnique[]; // Define if needed
  consent_to_treatment: ConsentToTreatment[]; // Define if needed
  created_at: string;
}

export interface Location {
  id: number;
  title: string;
  address: string;
  phone1: string;
  phone2: string;
  email: string;
  city: string;
  state: string;
  user_id: number | null;
  client_id: number | null;
  zip: string;
  telfax: string | null;
  avatar: string | null;
  created_at: string;
}

export interface DashboardAdminResponse {
  porcentaje_dt: number;
  num_bips_total_before: number;
  num_bips_total_current: number;
  porcentaje_dp: number;
  bips: {
    data: Bip[];
  };
  locations: {
    data: Location[];
  };
  total_bips: number;
  total_patients: number;
  total_noteRbts: number;
  total_noteBcbas: number;
  total_employees: number;
  recent_patients: RecentPatient[];
  num_bips_current: number;
  num_bips_before: number;
  porcentaje_d: number;
  num_bips_attention_current: number;
  num_bips_attention_before: number;
  porcentaje_da: number;
  num_patients_current: number;
  num_patients_before: number;
  porcentajeDP: number;
}

export interface DashboardAdminYearResponse {
  query_income_year: any[];
  query_patients_speciality: any[];
  months_name: string[];
  query_patients_by_gender: {
    year: number;
    month: number;
    hombre: string;
    mujer: string;
  }[];
}
