import {
  ForceMap,
  NumberOrNullOrUndefined,
  StringOrNullOrUndefined,
  TypeOrNullOrUndefined,
} from 'src/app/shared/utils';
import { GeneralizationTraining } from './generalization-training.v2.model';
import { Objective } from './objective.v2.model';
import { PlanV2 } from './plan.v2.model';
type TypeOfAssessment = 1 | 2 | 3;
export const TYPE_OF_ASSESSMENT_MAP: Record<TypeOfAssessment, string> = {
  1: 'Assessment',
  2: 'Reassessment',
  3: 'Initial',
};

export class DocumentV2 {
  index: number;
  title: string;
  status?: 'pending' | 'reviewing' | 'yes' | 'no';
  constructor(data: Partial<DocumentV2>) {
    Object.assign(this, data);
  }
  static getDefault(): DocumentV2 {
    return {
      index: 0,
      title: '',
      status: 'no',
    };
  }
}

export class Intervention {
  index?: number;
  title: string;
  description: string;
  constructor(data: Partial<Intervention>) {
    Object.assign(this, data);
  }
  static getDefault(): Intervention {
    return {
      index: 0,
      title: '',
      description: '',
    };
  }
}

export class Attention {
  index?: number;
  preventive_strategies: string;
  replacement_skills: string;
  manager_strategies: string;
  constructor(data: Partial<Attention>) {
    Object.assign(this, data);
  }
  static getDefault(): Attention {
    return new Attention({
      index: 0,
      preventive_strategies: '',
      replacement_skills: '',
      manager_strategies: '',
    });
  }
}

export class Escape {
  index?: number;
  preventive_strategies: string;
  replacement_skills: string;
  manager_strategies: string;
  constructor(data: Partial<Escape>) {
    Object.assign(this, data);
  }
  static getDefault(): Escape {
    return new Escape({
      index: 0,
      preventive_strategies: '',
      replacement_skills: '',
      manager_strategies: '',
    });
  }
}

export class Sensory {
  index?: number;
  preventive_strategies: string;
  replacement_skills: string;
  manager_strategies: string;
  constructor(data: Partial<Sensory>) {
    Object.assign(this, data);
  }
  static getDefault(): Sensory {
    return new Sensory({
      index: 0,
      preventive_strategies: '',
      replacement_skills: '',
      manager_strategies: '',
    });
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
  static getDefault(): Tangible {
    return new Tangible({
      index: 0,
      preventive_strategies: '',
      replacement_skills: '',
      manager_strategies: '',
    });
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
  static getDeafult(): PrevalentSettingEventAndAntecedent {
    return {
      index: 0,
      prevalent_setting_event_and_atecedent: '',
      behavior: '',
      hypothesized_functions: '',
    };
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
  static getDefault() {
    return new AssestmentEvaluationSetting({
      index: 0,
      tangible: '',
      activities: '',
      other: '',
    });
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
  static getDefault(): Medication {
    return {
      index: 0,
      medication: '',
      dose: '',
      frecuency: '',
      reason: '',
      preescribing_physician: '',
    };
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
  index?: number;
  cpt: string;
  num_units: number;
  breakdown_per_week: string;
  location: string;
  description_service: string;
  constructor(data: Partial<Recomendation>) {
    Object.assign(this, data);
  }
  static getDefault(): Recomendation {
    return {
      cpt: '',
      num_units: 0,
      breakdown_per_week: '',
      location: '',
      description_service: '',
    };
  }
}

export class DeEscalationTechnique {
  id: number;
  bip_id: number;
  patient_id: string;
  client_id: number;
  description: string;
  service_recomendation: string;
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
  static getDefault(): DeEscalationTechnique {
    return {
      id: 0,
      bip_id: 0,
      patient_id: '',
      client_id: 0,
      description: '',
      service_recomendation: '',
      recomendation_lists: [],
    };
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
  risk_factors: RiskFactor;
  suicidalities: Suicidality;
  homicidalities: Homicidality;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  constructor(data: Partial<CrisisPlan>) {
    Object.assign(this, data);
    this.risk_factors = new RiskFactor(data.risk_factors);
    this.suicidalities = new Suicidality(data.suicidalities);
    this.homicidalities = new Homicidality(data.homicidalities);
  }
  static getDefault(): CrisisPlan {
    return {
      id: 0,
      bip_id: 0,
      patient_id: '',
      client_id: 0,
      crisis_description: '',
      crisis_note: '',
      caregiver_requirements_for_prevention_of_crisis: '',
      risk_factors: RiskFactor.getDefault(),
      suicidalities: Suicidality.getDefault(),
      homicidalities: Homicidality.getDefault(),
    };
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
    this.do_not_apply = !!data.do_not_apply;
    this.elopement = !!data.elopement;
    this.assaultive_behavior = !!data.assaultive_behavior;
    this.aggression = !!data.aggression;
    this.self_injurious_behavior = !!data.self_injurious_behavior;
    this.sexually_offending_behavior = !!data.sexually_offending_behavior;
    this.fire_setting = !!data.fire_setting;
    this.current_substance_abuse = !!data.current_substance_abuse;
    this.impulsive_behavior = !!data.impulsive_behavior;
    this.psychotic_symptoms = !!data.psychotic_symptoms;
    this.self_mutilation_cutting = !!data.self_mutilation_cutting;
    this.caring_for_ill_family_recipient =
      !!data.caring_for_ill_family_recipient;
    this.current_family_violence = !!data.current_family_violence;
    this.dealing_with_significant = !!data.dealing_with_significant;
    this.prior_psychiatric_inpatient_admission =
      !!data.prior_psychiatric_inpatient_admission;
  }
  static getDefault(): RiskFactor {
    return {
      do_not_apply: false,
      elopement: false,
      assaultive_behavior: false,
      aggression: false,
      self_injurious_behavior: false,
      sexually_offending_behavior: false,
      fire_setting: false,
      current_substance_abuse: false,
      impulsive_behavior: false,
      psychotic_symptoms: false,
      self_mutilation_cutting: false,
      caring_for_ill_family_recipient: false,
      current_family_violence: false,
      dealing_with_significant: false,
      prior_psychiatric_inpatient_admission: false,
      other: '',
    };
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
    this.not_present = !!data.not_present;
    this.ideation = !!data.ideation;
    this.plan = !!data.plan;
    this.means = !!data.means;
    this.prior_attempt = !!data.prior_attempt;
  }
  static getDefault(): Suicidality {
    return {
      not_present: false,
      ideation: false,
      plan: false,
      means: false,
      prior_attempt: false,
    };
  }
}
export class Homicidality {
  not_present: boolean;
  ideation: boolean;
  plan: boolean;
  means: boolean;
  prior_attempt: boolean;
  constructor(data: Partial<Homicidality>) {
    Object.assign(this, data);
    this.not_present = !!data.not_present;
    this.ideation = !!data.ideation;
    this.plan = !!data.plan;
    this.means = !!data.means;
    this.prior_attempt = !!data.prior_attempt;
  }
  static getDefault(): Homicidality {
    return {
      not_present: false,
      ideation: false,
      plan: false,
      means: false,
      prior_attempt: false,
    };
  }
}

export class Sustitution extends PlanV2 {
  stos: Objective[];
  ltos: Objective[];
  constructor(data: Partial<Sustitution>) {
    super(data);
    this.category = 'sustitution';
    this.stos = ForceMap(data.stos, Objective);
    this.ltos = ForceMap(data.ltos, Objective);
  }
}

export class DocumentReviewed {
  document_title: string;
  document_status: string;
  constructor(data: Partial<DocumentReviewed>) {
    Object.assign(this, data);
    this.document_title = StringOrNullOrUndefined(data.document_title);
    this.document_status = StringOrNullOrUndefined(data.document_status);
  }
}

export class BipV2 {
  id: number;
  client_id: number;
  type_of_assessment: TypeOfAssessment;
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
  maladaptives: PlanV2[];
  replacements: PlanV2[];
  assestment_conducted_options: DocumentV2[];
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
  reduction_goal: PlanV2[];
  sustitution_goal: Sustitution[];
  family_envolment: PlanV2[];
  rbt_trainings: PlanV2[];
  monitoring_evalutating: PlanV2[];
  generalization_trainings: GeneralizationTraining[];
  crisis_plans: CrisisPlan[];
  de_escalation_techniques: DeEscalationTechnique[];
  consent_to_treatments: ConsentToTreatment[];
  caregiver_trainings: PlanV2[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  constructor(data: Partial<BipV2>) {
    const self: BipV2 = {
      ...data,
      id: NumberOrNullOrUndefined(data.id),
      client_id: NumberOrNullOrUndefined(data.client_id),
      type_of_assessment: NumberOrNullOrUndefined(
        data.type_of_assessment
      ) as TypeOfAssessment,
      doctor_id: NumberOrNullOrUndefined(data.doctor_id),
      doctor: TypeOrNullOrUndefined(data.doctor, Doctor),
      patient_identifier: StringOrNullOrUndefined(data.patient_identifier),
      phiysical_and_medical: StringOrNullOrUndefined(data.phisical_and_medical),
      maladaptives: ForceMap(data.maladaptives, PlanV2),
      replacements: ForceMap(data.replacements, PlanV2),
      strengths: StringOrNullOrUndefined(data.strengths),
      weakneses: StringOrNullOrUndefined(data.weakneses),
      assestmentEvaluationSettings: ForceMap(
        data.assestmentEvaluationSettings,
        AssestmentEvaluationSetting
      ),
      assestment_conducted_options: ForceMap(
        data.assestment_conducted_options,
        DocumentV2
      ),
      assestment_conducted: StringOrNullOrUndefined(data.assestment_conducted),
      background_information: StringOrNullOrUndefined(
        data.background_information
      ),
      current_treatment_and_progress: StringOrNullOrUndefined(
        data.current_treatment_and_progress
      ),
      education_status: StringOrNullOrUndefined(data.education_status),
      family_envolment: ForceMap(data.family_envolment, PlanV2),
      goal_ltos: StringOrNullOrUndefined(data.goal_ltos),
      goal_stos: StringOrNullOrUndefined(data.goal_stos),
      hypothesis_based_intervention: StringOrNullOrUndefined(
        data.hypothesis_based_intervention
      ),
      interventions: ForceMap(data.interventions, Intervention),
      monitoring_evalutating: ForceMap(data.monitoring_evalutating, PlanV2),
      phisical_and_medical: ForceMap(data.phisical_and_medical, Medication),
      phisical_and_medical_status: StringOrNullOrUndefined(
        data.phisical_and_medical_status
      ),
      previus_treatment_and_result: StringOrNullOrUndefined(
        data.previus_treatment_and_result
      ),
      rbt_trainings: ForceMap(data.rbt_trainings, PlanV2),
      reduction_goal: ForceMap(data.reduction_goal, PlanV2),
      sensory: ForceMap(data.sensory, Sensory),
      sustitution_goal: ForceMap(data.sustitution_goal, Sustitution),
      tangibles: ForceMap(data.tangibles, Tangible),
      attention: ForceMap(data.attention, Attention),
      escape: ForceMap(data.escape, Escape),
      de_escalation_techniques: ForceMap(
        data.de_escalation_techniques,
        DeEscalationTechnique
      ),
      consent_to_treatments: ForceMap(
        data.consent_to_treatments,
        ConsentToTreatment
      ),
      documents_reviewed: ForceMap(data.documents_reviewed, DocumentV2),
      generalization_trainings: ForceMap(
        data.generalization_trainings,
        GeneralizationTraining
      ),
      crisis_plans: ForceMap(data.crisis_plans, CrisisPlan),
      prevalent_setting_event_and_atecedents: ForceMap(
        data.prevalent_setting_event_and_atecedents,
        PrevalentSettingEventAndAntecedent
      ),
      caregiver_trainings: ForceMap(data.caregiver_trainings, PlanV2),
    };
    return self;
  }
}
