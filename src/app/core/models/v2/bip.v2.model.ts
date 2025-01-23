import {
  ForceMap,
  NumberOrNullOrUndefined,
  StringOrNullOrUndefined,
} from 'src/app/shared/utils';
import { GeneralizationTraining } from './generalization-training.v2.model';
import { Objective } from './objective.v2.model';
import { PlanV2 } from './plan.v2.model';
import { DocumentV2 } from './document.v2.model';
import { CrisisPlanV2 } from './crisis-plan.v2.model';
type TypeOfAssessment = 1 | 2 | 3;
export const TYPE_OF_ASSESSMENT_MAP: Record<TypeOfAssessment, string> = {
  1: 'Assessment',
  2: 'Reassessment',
  3: 'Initial',
};

export class Intervention {
  index?: number;
  title: string;
  description: string;
  constructor(data: Partial<Intervention>) {
    Object.assign(this, data);
  }
  static getDefault(): Intervention {
    return {
      index: undefined,
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
      index: undefined, // Changed from 0
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
      index: undefined, // Changed from 0
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
      index: undefined, // Changed from 0
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
      index: undefined, // Changed from 0
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
      index: undefined, // Changed from 0
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
      index: undefined, // Changed from 0
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
      index: undefined, // Changed from 0
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
  id: number;
  de_escalation_technique_id: number;
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
      id: 0,
      de_escalation_technique_id: 0,
      index: undefined, // Changed from 0
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

export class Sustitution extends PlanV2 {
  stos: Objective[];
  ltos: Objective[];
  constructor(data: Partial<Sustitution>) {
    super(data);
    this.category = 'replacement';
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
  client_id: number; //patient_id
  doctor_id: number;
  assestment_conducted: string;
  assestment_conducted_options: DocumentV2[];
  assestment_evaluation_settings: AssestmentEvaluationSetting[];
  attention: Attention[];
  background_information: string;
  caregiver_trainings: PlanV2[];
  consent_to_treatments: ConsentToTreatment[];
  crisis_plans: CrisisPlanV2[]; //make endpoint
  current_treatment_and_progress: string;
  de_escalation_techniques: DeEscalationTechnique[]; //make endpoint
  documents_reviewed: DocumentV2[];
  education_status: string;
  escape: Escape[];
  generalization_trainings: GeneralizationTraining[];
  hypothesis_based_intervention: string;
  interventions: Intervention[];
  maladaptives: PlanV2[];
  patient_identifier: string;
  physical_and_medical: Medication[];
  physical_and_medical_status: string;
  prevalent_setting_event_and_atecedents: PrevalentSettingEventAndAntecedent[];
  previus_treatment_and_result: string;
  rbt_trainings: PlanV2[];
  replacements: PlanV2[];
  sensory: Sensory[];
  strengths: string;
  sustitution_goal: Sustitution[];
  tangibles: Tangible[];
  type_of_assessment: TypeOfAssessment;
  weakneses: string;
  updated_at?: Date;
  created_at?: Date;
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
      patient_identifier: StringOrNullOrUndefined(data.patient_identifier),

      maladaptives: ForceMap(data.maladaptives, PlanV2),
      replacements: ForceMap(data.replacements, PlanV2),
      strengths: StringOrNullOrUndefined(data.strengths),
      weakneses: StringOrNullOrUndefined(data.weakneses),
      assestment_evaluation_settings: ForceMap(
        data.assestment_evaluation_settings,
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
      caregiver_trainings: ForceMap(data.caregiver_trainings, PlanV2),
      hypothesis_based_intervention: StringOrNullOrUndefined(
        data.hypothesis_based_intervention
      ),
      interventions: ForceMap(data.interventions, Intervention),
      rbt_trainings: ForceMap(data.rbt_trainings, PlanV2),
      physical_and_medical: ForceMap(data.physical_and_medical, Medication),
      physical_and_medical_status: StringOrNullOrUndefined(
        data.physical_and_medical_status
      ),
      previus_treatment_and_result: StringOrNullOrUndefined(
        data.previus_treatment_and_result
      ),
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
      crisis_plans: ForceMap(data.crisis_plans, CrisisPlanV2),
      prevalent_setting_event_and_atecedents: ForceMap(
        data.prevalent_setting_event_and_atecedents,
        PrevalentSettingEventAndAntecedent
      ),
    };
    //Extra Changes
    self.maladaptives = self.maladaptives.map((item, index) => ({
      ...item,
      index,
    }));
    self.replacements = self.replacements.map((item, index) => ({
      ...item,
      index,
    }));
    self.caregiver_trainings = self.caregiver_trainings.map((item, index) => ({
      ...item,
      index,
    }));
    self.rbt_trainings = self.rbt_trainings.map((item, index) => ({
      ...item,
      index,
    }));
    return self;
  }
  static getDefault(): BipV2 {
    return {
      id: undefined,
      client_id: undefined,
      type_of_assessment: undefined,
      doctor_id: undefined,
      patient_identifier: undefined,
      strengths: undefined,
      weakneses: undefined,
      assestment_evaluation_settings: [],
      assestment_conducted_options: [],
      assestment_conducted: undefined,
      background_information: undefined,
      current_treatment_and_progress: undefined,
      education_status: undefined,
      caregiver_trainings: [],
      hypothesis_based_intervention: undefined,
      interventions: [],
      rbt_trainings: [],
      physical_and_medical: [],
      physical_and_medical_status: undefined,
      previus_treatment_and_result: undefined,
      sensory: [],
      sustitution_goal: [],
      tangibles: [],
      attention: [],
      escape: [],
      generalization_trainings: [],
      maladaptives: [],
      replacements: [],
      documents_reviewed: [],
      crisis_plans: [],
      de_escalation_techniques: [],
      consent_to_treatments: [],
      prevalent_setting_event_and_atecedents: [],
      created_at: undefined,
      updated_at: undefined,
      deleted_at: undefined,
    };
  }
}
