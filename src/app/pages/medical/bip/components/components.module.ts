import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssestmentEvaluationSettingFormComponent } from './assestment-evaluation-setting-form/assestment-evaluation-setting-form.component';
import { AttentionFormComponent } from './attention-form/attention-form.component';
import { BehaviorAnalysisAssessmentFormComponent } from './behavior-analysis-assessment-form/behavior-analysis-assessment-form.component';
import { BehaviorAssistantComponent } from './behavior-assistant/behavior-assistant.component';
import { BipDocumentsShowComponent } from './bip-documents-show/bip-documents-show.component';
import { AssestmentComponent } from './bip-form/assestment/assestment.component';
import { BehaviorAnalysisAssessmentComponent } from './bip-form/behavior-analysis-assessment/behavior-analysis-assessment.component';
import { BipFormComponent } from './bip-form/bip-form.component';
import { HypothesisBasedInterventionsComponent } from './bip-form/hypothesis-based-interventions/hypothesis-based-interventions.component';
import { InterventionsComponent } from './bip-form/interventions/interventions.component';
import { MaladaptivesComponent } from './bip-form/maladaptives/maladaptives.component';
import { PrevalentSettingComponent } from './bip-form/prevalent-setting/prevalent-setting.component';
import { BipProfileAssestmentComponent } from './bip-profile-assestment/bip-profile-assestment.component';
import { BipProfileBackgroundComponent } from './bip-profile-background/bip-profile-background.component';
import { BipProfileBehaviorComponent } from './bip-profile-behavior/bip-profile-behavior.component';
import { BipProfileConsentComponent } from './bip-profile-consent/bip-profile-consent.component';
import { BipProfileCrisisPlanComponent } from './bip-profile-crisis-plan/bip-profile-crisis-plan.component';
import { BipProfileDeEscalationComponent } from './bip-profile-de-escalation/bip-profile-de-escalation.component';
import { BipProfileFamilyComponent } from './bip-profile-family/bip-profile-family.component';
import { BipProfileGeneralizationComponent } from './bip-profile-generalization/bip-profile-generalization.component';
import { BipProfileHeadComponent } from './bip-profile-head/bip-profile-head.component';
import { BipProfileHypothesisComponent } from './bip-profile-hypothesis/bip-profile-hypothesis.component';
import { BipProfileInterventionsComponent } from './bip-profile-interventions/bip-profile-interventions.component';
import { BipProfileMaladaptivesComponent } from './bip-profile-maladaptives/bip-profile-maladaptives.component';
import { BipProfileMonotoringComponent } from './bip-profile-monotoring/bip-profile-monotoring.component';
import { BipProfilePatientDataComponent } from './bip-profile-patient-data/bip-profile-patient-data.component';
import { BipProfilePrevalentComponent } from './bip-profile-prevalent/bip-profile-prevalent.component';
import { BipProfileReductionsComponent } from './bip-profile-reductions/bip-profile-reductions.component';
import { BipProfileRiskAssestmentComponent } from './bip-profile-risk-assestment/bip-profile-risk-assestment.component';
import { ChartReductionComponent } from './charts/chart-reduction/chart-reduction.component';
import { ChartReplacementComponent } from './charts/chart-replacement/chart-replacement.component';
import { ConsentTreatmentEditComponent } from './consent-treatment-edit/consent-treatment-edit.component';
import { ConsentTreatmentFormComponent } from './consent-treatment-form/consent-treatment-form.component';
import { CrisisPlanEditComponent } from './crisis-plan-edit/crisis-plan-edit.component';
import { CrisisPlanFormComponent } from './crisis-plan-form/crisis-plan-form.component';
import { CrisisPlanComponent } from './crisis-plan/crisis-plan.component';
import { DeEscalationEditComponent } from './de-escalation-edit/de-escalation-edit.component';
import { DeEscalationFormComponent } from './de-escalation-form/de-escalation-form.component';
import { DeEscalationTecniquesComponent } from './de-escalation-tecniques/de-escalation-tecniques.component';
import { DocumentFormComponent } from './document-form/document-form.component';
import { DocumentReviewedFormComponent } from './document-reviewed-form/document-reviewed-form.component';
import { EscapeFormComponent } from './escape-form/escape-form.component';
import { FamilyInvolvementGoalFormComponent } from './family-involvement-goal-form/family-involvement-goal-form.component';
import { GeneralizationTrainingEditComponent } from './generalization-training-edit/generalization-training-edit.component';
import { GeneralizationTrainingFormComponent } from './generalization-training-form/generalization-training-form.component';
import { GeneralizationTrainingComponent } from './generalization-training/generalization-training.component';
import { HomicidalitiesComponent } from './homicidalities/homicidalities.component';
import { InterventionFormComponent } from './intervention-form/intervention-form.component';
import { MonitoringEvaluatingEditComponent } from './monitoring-evaluating-edit/monitoring-evaluating-edit.component';
import { MonitoringEvaluatingComponent } from './monitoring-evaluating/monitoring-evaluating.component';
import { ObjectiveFormComponent } from './objective-form/objective-form.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { PhisicalAndMedicalComponent } from './phisical_and_medical/phisical_and_medical.component';
import { PlanEditComponent } from './plan-edit/plan-edit.component';
import { GoalFormSimpleComponent } from './plan-form/plan-form.component';
import { PrevalentSettingEventAndAntecedentComponent } from './prevalent-setting-event-and-antecedent/prevalent-setting-event-and-antecedent.component';
import { RbtTrainingGoalFormComponent } from './rbt-training-goal-form/rbt-training-goal-form.component';
import { RecomendationFormComponent } from './recomendation-form/recomendation-form.component';
import { ReductionGoalFormComponent } from './reduction-goal-form/reduction-goal-form.component';
import { RiskAssestmentFormComponent } from './risk-assestment-form/risk-assestment-form.component';
import { RiskFactorsComponent } from './risk-factors/risk-factors.component';
import { SensoryFormComponent } from './sensory-form/sensory-form.component';
import { SuicidalitiesComponent } from './suicidalities/suicidalities.component';
import { SustitutionListComponent } from './sustitution-list/sustitution-list.component';
import { TangibleFormComponent } from './tangible-form/tangible-form.component';
import { TransitionFadingPlanFormComponent } from './transition-fading-plan-form/transition-fading-plan-form.component';
import { BipProfileFadingPlanComponent } from './bip-profile-fading-plan/bip-profile-fading-plan.component';
import { FadingPlanFormComponent } from './fading-plan-form/fading-plan-form.component';
import { DischargePlanFormComponent } from './discharge-plan-form/discharge-plan-form.component';
import { BipProfileDischargePlanComponent } from './bip-profile-discharge-plan/bip-profile-discharge-plan.component';
import { BipProfileServiceRecomendationComponent } from './bip-profile-service-recomendation/bip-profile-service-recomendation.component';
import { ServiceRecomendationComponent } from './service-recomendation/service-recomendation.component';
import { ServiceRecomendationFormComponent } from './service-recomendation-form/service-recomendation-form.component';

const components = [
  AssestmentComponent,
  BehaviorAnalysisAssessmentComponent,
  BehaviorAssistantComponent,
  BipDocumentsShowComponent,
  BipFormComponent,
  BipProfileAssestmentComponent,
  BipProfileBackgroundComponent,
  BipProfileBehaviorComponent,
  BipProfileConsentComponent,
  BipProfileCrisisPlanComponent,
  BipProfileDeEscalationComponent,
  BipProfileFamilyComponent,
  BipProfileGeneralizationComponent,
  BipProfileHeadComponent,
  BipProfileHypothesisComponent,
  BipProfileInterventionsComponent,
  BipProfileMaladaptivesComponent,
  BipProfileMonotoringComponent,
  BipProfilePatientDataComponent,
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
  FamilyInvolvementGoalFormComponent,
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
  ReductionGoalFormComponent,
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
