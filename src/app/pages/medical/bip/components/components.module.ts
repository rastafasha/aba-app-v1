import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssestmentEvaluationSettingFormComponent } from './assestment/assestment-form/assestment-evaluation-setting-form.component';
import { AttentionFormComponent } from './attention/attention-form/attention-form.component';
import { BehaviorAnalysisAssessmentFormComponent } from './background/background-form/behavior-analysis-assessment-form.component';
import { BehaviorAssistantComponent } from './behaviour/behaviour-edit/behavior-assistant.component';
import { BipDocumentsShowComponent } from './document/documents-show/bip-documents-show.component';
import { AssestmentComponent } from './assestment/assestment-edit/assestment.component';
import { BehaviorAnalysisAssessmentComponent } from './background/background-edit/behavior-analysis-assessment.component';
import { BipFormComponent } from './bip-form/bip-form.component';
import { HypothesisBasedInterventionsComponent } from './hypothesis/hypothesis-edit/hypothesis-based-interventions.component';
import { InterventionsComponent } from './interventions/interventions-edit/interventions.component';
import { MaladaptivesComponent } from './maladaptives/maladaptives-xxx/maladaptives.component';
import { PrevalentSettingComponent } from './prevalent/prevalent-edit/prevalent-setting.component';
import { AssestmentShowComponent } from './assestment/assestment-show/assestment-show.component';
import { BipProfileBackgroundComponent } from './background/background-show/bip-profile-background.component';
import { BipProfileBehaviorComponent } from './behaviour/behaviour-show/bip-profile-behavior.component';
import { BipProfileConsentComponent } from './consent-treatment/consent-treatment-show/bip-profile-consent.component';
import { BipProfileCrisisPlanComponent } from './crisis/crisis-show/bip-profile-crisis-plan.component';
import { BipProfileDeEscalationComponent } from './de-escalation/de-escalation-show/bip-profile-de-escalation.component';
import { BipProfileDischargePlanComponent } from './discharge/discharge-show/bip-profile-discharge-plan.component';
import { BipProfileFadingPlanComponent } from './fading/fading-show/bip-profile-fading-plan.component';
import { FamilyShowComponent } from './family/family-show/family-show.component';
import { BipProfileGeneralizationComponent } from './generalization/generalization-show/bip-profile-generalization.component';
import { BipShowHeadComponent } from './bip-show-head/bip-show-head.component';
import { BipProfileHypothesisComponent } from './hypothesis/hypothesis-show/bip-profile-hypothesis.component';
import { BipProfileInterventionsComponent } from './interventions/interventions-show/interventions-show.component';
import { BipProfileMaladaptivesComponent } from './maladaptives/maladaptives-show/bip-profile-maladaptives.component';
import { BipProfileMonotoringComponent } from './monotoring/monotoring-show/bip-profile-monotoring.component';
import { BipShowPatientComponent } from './bip-show-patient/bip-show-patient.component';
import { BipProfilePrevalentComponent } from './prevalent/prevalent-show/bip-profile-prevalent.component';
import { BipProfileReductionsComponent } from './reductions/reductions-show/bip-profile-reductions.component';
import { BipProfileRiskAssestmentComponent } from './risk-assestment/risk-assestment-show/bip-profile-risk-assestment.component';
import { BipProfileServiceRecomendationComponent } from './recomendation/recomendation-show/bip-profile-service-recomendation.component';
import { ChartReductionComponent } from './charts/chart-reduction/chart-reduction.component';
import { ChartReplacementComponent } from './charts/chart-replacement/chart-replacement.component';
import { ConsentTreatmentEditComponent } from './consent-treatment/consent-treatment-edit/consent-treatment-edit.component';
import { ConsentTreatmentFormComponent } from './consent-treatment/consent-treatment-form/consent-treatment-form.component';
import { CrisisPlanEditComponent } from './crisis/crisis-edit-form/crisis-plan-edit.component';
import { CrisisPlanFormComponent } from './crisis/crisis-form/crisis-plan-form.component';
import { CrisisPlanComponent } from './crisis/crisis-edit/crisis-plan.component';
import { DeEscalationEditComponent } from './de-escalation/de-escalation-edit/de-escalation-edit.component';
import { DeEscalationFormComponent } from './de-escalation/de-escalation-form/de-escalation-form.component';
import { DeEscalationTecniquesComponent } from './de-escalation/de-escalation-edit-show/de-escalation-tecniques.component';
import { DischargePlanFormComponent } from './discharge/discharge-edit/discharge-plan-form.component';
import { DocumentFormComponent } from './document/document-form/document-form.component';
import { DocumentReviewedFormComponent } from './document/document-reviewed-form/document-reviewed-form.component';
import { EscapeFormComponent } from './escape/escape-form/escape-form.component';
import { FadingPlanFormComponent } from './fading/fading-edit/fading-plan-form.component';
import { FamilyEditComponent } from './family/family-edit/family-edit.component';
import { GeneralizationTrainingEditComponent } from './generalization/generalization-training-edit/generalization-training-edit.component';
import { GeneralizationTrainingFormComponent } from './generalization/generalization-training-form/generalization-training-form.component';
import { GeneralizationTrainingComponent } from './generalization/generalization-edit/generalization-training.component';
import { HomicidalitiesComponent } from './homicidalities/homicidalities.component';
import { InterventionFormComponent } from './interventions/interventions-form/intervention-form.component';
import { MonitoringEvaluatingEditComponent } from './monotoring/monotoring-form/monitoring-evaluating-edit.component';
import { MonitoringEvaluatingComponent } from './monotoring/monotoring-edit/monitoring-evaluating.component';
import { ObjectiveFormComponent } from './objective/objective-form/objective-form.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { PhisicalAndMedicalComponent } from './phisical_and_medical/phisical_and_medical.component';
import { PlanEditComponent } from './plan/plan-edit/plan-edit.component';
import { GoalFormSimpleComponent } from './plan/plan-form/plan-form.component';
import { PrevalentSettingEventAndAntecedentComponent } from './prevalent/prevalent-form/prevalent-setting-event-and-antecedent.component';
import { RbtTrainingGoalFormComponent } from './rbt-training-goal-form/rbt-training-goal-form.component';
import { RecomendationFormComponent } from './recomendation/recomendation-form/recomendation-form.component';
import { MaladaptivesEditComponent } from './maladaptives/maladaptives-edit/reduction-goal-form.component';
import { RiskAssestmentFormComponent } from './risk-assestment/risk-assestment-edit/risk-assestment-form.component';
import { RiskFactorsComponent } from './risk-factors/risk-factors.component';
import { SensoryFormComponent } from './sensory/sensory-form/sensory-form.component';
import { ServiceRecomendationFormComponent } from './recomendation/recomendation-edit-form/service-recomendation-form.component';
import { ServiceRecomendationComponent } from './recomendation/recomendation-edit/service-recomendation.component';
import { SuicidalitiesComponent } from './suicidalities/suicidalities.component';
import { SustitutionListComponent } from './reductions/reductions-edit/sustitution-list.component';
import { TangibleFormComponent } from './tangible/tangible-form/tangible-form.component';
import { TransitionFadingPlanFormComponent } from './fading/fading-edit-old/transition-fading-plan-form.component';
import { FamilyFormComponent } from './family/family-form/family-form.component';

const components = [
  AssestmentComponent,
  BehaviorAnalysisAssessmentComponent,
  BehaviorAssistantComponent,
  BipDocumentsShowComponent,
  BipFormComponent,
  AssestmentShowComponent,
  BipProfileBackgroundComponent,
  BipProfileBehaviorComponent,
  BipProfileConsentComponent,
  BipProfileCrisisPlanComponent,
  BipProfileDeEscalationComponent,
  FamilyShowComponent,
  FamilyEditComponent,
  FamilyFormComponent,

  BipProfileGeneralizationComponent,
  BipShowHeadComponent,
  BipProfileHypothesisComponent,
  BipProfileInterventionsComponent,
  BipProfileMaladaptivesComponent,
  BipProfileMonotoringComponent,
  BipShowPatientComponent,
  BipProfilePrevalentComponent,
  BipProfileReductionsComponent,
  BipProfileRiskAssestmentComponent,
  BipProfileFadingPlanComponent,
  BipProfileDischargePlanComponent,
  ChartReductionComponent,
  ChartReplacementComponent,
  ConsentTreatmentFormComponent,
  CrisisPlanEditComponent,
  DeEscalationTecniquesComponent,
  DocumentFormComponent,
  GeneralizationTrainingComponent,
  GoalFormSimpleComponent,
  HomicidalitiesComponent,
  HypothesisBasedInterventionsComponent,
  InterventionsComponent,
  MaladaptivesComponent,
  MonitoringEvaluatingComponent,
  PatientFormComponent,
  PhisicalAndMedicalComponent,
  PrevalentSettingComponent,
  RbtTrainingGoalFormComponent,
  RecomendationFormComponent,
  PlanEditComponent,
  MaladaptivesEditComponent,
  RiskFactorsComponent,
  ObjectiveFormComponent,
  SuicidalitiesComponent,
  SustitutionListComponent,
  TransitionFadingPlanFormComponent,
  AssestmentEvaluationSettingFormComponent,
  DocumentReviewedFormComponent,
  MonitoringEvaluatingEditComponent,
  PrevalentSettingEventAndAntecedentComponent,
  BehaviorAnalysisAssessmentFormComponent,
  InterventionFormComponent,
  TangibleFormComponent,
  SensoryFormComponent,
  EscapeFormComponent,
  AttentionFormComponent,
  GeneralizationTrainingEditComponent,
  GeneralizationTrainingFormComponent,
  CrisisPlanComponent,
  CrisisPlanFormComponent,
  DeEscalationFormComponent,
  DeEscalationEditComponent,
  ConsentTreatmentEditComponent,
  RiskAssestmentFormComponent,
  FadingPlanFormComponent,
  DischargePlanFormComponent,
  BipProfileServiceRecomendationComponent,
  ServiceRecomendationComponent,
  ServiceRecomendationFormComponent,
];
@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
  ],
})
export class ComponentsModule {}
