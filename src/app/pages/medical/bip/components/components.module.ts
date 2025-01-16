import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
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
import { BipProfileReplacementsComponent } from './bip-profile-replacements/bip-profile-replacements.component';
import { ChartReductionComponent } from './charts/chart-reduction/chart-reduction.component';
import { ChartReplacementComponent } from './charts/chart-replacement/chart-replacement.component';
import { ConsentTreatmentFormComponent } from './consent-treatment-form/consent-treatment-form.component';
import { CrisisPlanComponent } from './crisis-plan/crisis-plan.component';
import { DeEscalationTecniquesComponent } from './de-escalation-tecniques/de-escalation-tecniques.component';
import { FamilyInvolvementGoalFormComponent } from './family-involvement-goal-form/family-involvement-goal-form.component';
import { GeneralizationTrainingComponent } from './generalization-training/generalization-training.component';
import { GoalFormSimpleComponent } from './goal-form-simple/goal-form-simple.component';
import { GoalFormComponent } from './goal-form/goal-form.component';
import { HomicidalitiesComponent } from './homicidalities/homicidalities.component';
import { LtoFormComponent } from './lto-form/lto-form.component';
import { LtoListAndFormComponent } from './lto-list-and-form/lto-list-and-form.component';
import { MonitoringEvaluatingComponent } from './monitoring-evaluating/monitoring-evaluating.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { RecomendationFormComponent } from './recomendation-form/recomendation-form.component';
import { ReductionGoalEditComponent } from './reduction-goal-edit/reduction-goal-edit.component';
import { MaladaptiveGoalsTableComponent } from './reduction-goal-form/maladaptive-goals-table/maladaptive-goals-table.component';
import { ReductionGoalFormComponent } from './reduction-goal-form/reduction-goal-form.component';
import { ReplacementGoalFormComponent } from './replacement-goal-form/replacement-goal-form.component';
import { RiskFactorsComponent } from './risk-factors/risk-factors.component';
import { StoFormComponent } from './sto-form/sto-form.component';
import { StoListAndFormComponent } from './sto-list-and-form/sto-list-and-form.component';
import { SuicidalitiesComponent } from './suicidalities/suicidalities.component';
import { SustitutionListComponent } from './sustitution-list/sustitution-list.component';
import { TransitionFadingPlanFormComponent } from './transition-fading-plan-form/transition-fading-plan-form.component';
import { RbtTrainingGoalFormComponent } from './rbt-training-goal-form/rbt-training-goal-form.component';

const components = [
  BipFormComponent,
  ReductionGoalFormComponent,
  FamilyInvolvementGoalFormComponent,
  MonitoringEvaluatingComponent,
  BehaviorAssistantComponent,
  GeneralizationTrainingComponent,
  CrisisPlanComponent,
  DeEscalationTecniquesComponent,
  ConsentTreatmentFormComponent,
  SustitutionListComponent,
  ChartReductionComponent,
  ChartReplacementComponent,
  ReductionGoalEditComponent,
  ReplacementGoalFormComponent,
  PatientFormComponent,
  BehaviorAnalysisAssessmentComponent,
  MaladaptivesComponent,
  AssestmentComponent,
  PrevalentSettingComponent,
  HypothesisBasedInterventionsComponent,
  InterventionsComponent,
  MaladaptiveGoalsTableComponent,
  StoFormComponent,
  LtoFormComponent,
  GoalFormComponent,
  StoListAndFormComponent,
  LtoListAndFormComponent,
  GoalFormSimpleComponent,
  BipProfileHeadComponent,
  BipProfilePatientDataComponent,
  BipDocumentsShowComponent,
  BipProfileBackgroundComponent,
  BipProfileMaladaptivesComponent,
  BipProfileAssestmentComponent,
  BipProfilePrevalentComponent,
  BipProfileHypothesisComponent,
  BipProfileInterventionsComponent,
  BipProfileReductionsComponent,
  BipProfileReplacementsComponent,
  BipProfileFamilyComponent,
  BipProfileMonotoringComponent,
  BipProfileBehaviorComponent,
  BipProfileGeneralizationComponent,
  BipProfileCrisisPlanComponent,
  BipProfileConsentComponent,
  BipProfileDeEscalationComponent,
  RecomendationFormComponent,
  RiskFactorsComponent,
  SuicidalitiesComponent,
  HomicidalitiesComponent,
];
@NgModule({
  declarations: [...components, TransitionFadingPlanFormComponent, RbtTrainingGoalFormComponent],
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
