import {
  ForceMap,
  NumberOrNullOrUndefined,
  StringOrNullOrUndefined,
} from 'src/app/shared/utils';
import { ConsentToTreatment } from './consent-to-treatment.v2.model';
import { PLAN_CONST, TypeOfAssessment } from './constants';
import { CrisisPlanV2 } from './crisis-plan.v2.model';
import { DocumentV2 } from './document.v2.model';
import { GeneralizationTraining } from './generalization-training.v2.model';
import { Intervention } from './intervention.v2.model';
import { PlanV2 } from './plan.v2.model';
import { Attention } from './attention.model';
import { Escape } from './escape.model';
import { Sensory } from './sensory.model';
import { Tangible } from './tangible.model';
import { PrevalentSettingEventAndAntecedent } from './prevalent-setting-event-and-antecedent';
import { AssestmentEvaluationSetting } from './assestment-evaluation-setting';
import { Medication } from './medication.model';
import { DeEscalationTechnique } from './de-escalation-technique';

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
      type_of_assessment: StringOrNullOrUndefined(
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
      hypothesis_based_intervention:
        StringOrNullOrUndefined(data.hypothesis_based_intervention) ??
        PLAN_CONST.HYPOTHESIS_BASED_INTERVENTION,
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
      caregiver_trainings: [PlanV2.getDefaultCaregiverPlan()],
      hypothesis_based_intervention: PLAN_CONST.HYPOTHESIS_BASED_INTERVENTION,
      interventions: Intervention.getDefaults(),
      rbt_trainings: [],
      physical_and_medical: [],
      physical_and_medical_status: undefined,
      previus_treatment_and_result: undefined,
      sensory: [],
      tangibles: [],
      attention: [],
      escape: [],
      generalization_trainings: [],
      maladaptives: [],
      replacements: [],
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
