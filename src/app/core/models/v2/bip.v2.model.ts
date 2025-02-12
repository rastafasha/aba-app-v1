import {
  ForceMap,
  NumberOrNullOrUndefined,
  StringOrNullOrUndefined,
} from 'src/app/shared/utils';
import { AssestmentEvaluationSetting } from './assestment-evaluation-setting';
import { Attention } from './attention.model';
import { ConsentToTreatment } from './consent-to-treatment.v2.model';
import { PLAN_CONST, TypeOfAssessment } from './constants';
import { CrisisPlanV2 } from './crisis-plan.v2.model';
import { DeEscalationTechnique } from './de-escalation-technique';
import { DocumentV2 } from './document.v2.model';
import { Escape } from './escape.model';
import { Intervention } from './intervention.v2.model';
import { Medication } from './medication.model';
import { PlanV2 } from './plan.v2.model';
import { PrevalentSettingEventAndAntecedent } from './prevalent-setting-event-and-antecedent';
import { Recommendation } from './recommendation.model';
import { Sensory } from './sensory.model';
import { Tangible } from './tangible.model';

export class BipV2 {
  id: number;
  client_id: number; //patient_id
  doctor_id: number;
  documents_reviewed: DocumentV2[];
  assestment_conducted: string;
  assestment_evaluation_settings: AssestmentEvaluationSetting[];
  attention: Attention[];
  background_information: string;
  caregiver_trainings: PlanV2[];
  consent_to_treatment: ConsentToTreatment;
  crisis_plan: CrisisPlanV2;
  current_treatment_and_progress: string;
  de_escalation_techniques: DeEscalationTechnique[];
  education_status: string;
  escape: Escape[];
  generalization_training: string;
  risk_assessment: string;
  fading_plan: string;
  discharge_plan: string;
  recommendations: Recommendation[];
  hypothesis_based_intervention: string;
  interventions: Intervention[];
  maladaptives: PlanV2[];
  patient_identifier: string;
  physical_and_medical: Medication[];
  physical_and_medical_status: string;
  prevalent_setting_event_and_antecedents: PrevalentSettingEventAndAntecedent[];
  previous_treatment_and_result: string;
  rbt_trainings: PlanV2[];
  replacements: PlanV2[];
  sensory: Sensory[];
  strengths: string;
  tangibles: Tangible[];
  type_of_assessment: TypeOfAssessment;
  weaknesses: string;
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
      weaknesses: StringOrNullOrUndefined(data.weaknesses),
      assestment_evaluation_settings: ForceMap(
        data.assestment_evaluation_settings,
        AssestmentEvaluationSetting
      ),
      documents_reviewed: ForceMap(data.documents_reviewed, DocumentV2),
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
      previous_treatment_and_result: StringOrNullOrUndefined(
        data.previous_treatment_and_result
      ),
      sensory: ForceMap(data.sensory, Sensory),
      tangibles: ForceMap(data.tangibles, Tangible),
      attention: ForceMap(data.attention, Attention),
      escape: ForceMap(data.escape, Escape),
      de_escalation_techniques: ForceMap(
        data.de_escalation_techniques,
        DeEscalationTechnique
      ),
      consent_to_treatment: new ConsentToTreatment(data.consent_to_treatment),
      generalization_training: StringOrNullOrUndefined(
        data.generalization_training
      ),
      risk_assessment: StringOrNullOrUndefined(data.risk_assessment),
      fading_plan: StringOrNullOrUndefined(data.fading_plan),
      discharge_plan: StringOrNullOrUndefined(data.discharge_plan),
      crisis_plan: data.crisis_plan && new CrisisPlanV2(data.crisis_plan),
      recommendations: ForceMap(data.recommendations, Recommendation),
      prevalent_setting_event_and_antecedents: ForceMap(
        data.prevalent_setting_event_and_antecedents,
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

    return BipV2.addDefaults(self);
  }
  static getDefault(): BipV2 {
    return this.addDefaults({
      id: undefined,
      client_id: undefined,
      type_of_assessment: undefined,
      doctor_id: undefined,
      patient_identifier: undefined,
      strengths: undefined,
      weaknesses: undefined,
      assestment_evaluation_settings: [],
      documents_reviewed: [],
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
      previous_treatment_and_result: undefined,
      sensory: undefined,
      tangibles: undefined,
      attention: undefined,
      escape: undefined,
      generalization_training: undefined,
      risk_assessment: undefined,
      fading_plan: undefined,
      discharge_plan: undefined,
      recommendations: [],
      maladaptives: [],
      replacements: [],
      crisis_plan: undefined,
      de_escalation_techniques: [],
      consent_to_treatment: undefined,
      prevalent_setting_event_and_antecedents: [],
      created_at: undefined,
      updated_at: undefined,
      deleted_at: undefined,
    });
  }
  private static addDefaults(data: BipV2): BipV2 {
    data.type_of_assessment ??= '1';
    data.hypothesis_based_intervention ??=
      PLAN_CONST.HYPOTHESIS_BASED_INTERVENTION;
    data.generalization_training ??= PLAN_CONST.GENERALIZATION_TRAINING;
    data.risk_assessment ??= PLAN_CONST.RISK_ASSESSMENT;
    data.fading_plan ??= PLAN_CONST.FADING_PLAN;
    data.discharge_plan ??= PLAN_CONST.DISCHARGE_PLAN;
    data.crisis_plan ??= CrisisPlanV2.getDefault();
    data.caregiver_trainings = data.caregiver_trainings?.length
      ? data.caregiver_trainings
      : PlanV2.getDefaultsCaregiverPlan();

    data.interventions = data.interventions?.length
      ? data.interventions
      : Intervention.getDefaults();
    data.tangibles = data.tangibles?.length
      ? data.tangibles
      : Tangible.getDefaults();
    data.attention = data.attention?.length
      ? data.attention
      : Attention.getDefaults();
    data.escape = data.escape?.length ? data.escape : Escape.getDefaults();
    data.sensory = data.sensory?.length ? data.sensory : Sensory.getDefaults();
    console.log(data.recommendations);
    data.recommendations = data.recommendations?.length
      ? data.recommendations
      : Recommendation.getDefaults();
    data.de_escalation_techniques = data.de_escalation_techniques?.length
      ? data.de_escalation_techniques
      : DeEscalationTechnique.getDefaults();
    data.consent_to_treatment ??= ConsentToTreatment.getDefault();
    return data;
  }
}
