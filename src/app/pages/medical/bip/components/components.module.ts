import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { BehaviorAssistantComponent } from './behavior-assistant/behavior-assistant.component';
import { AssestmentComponent } from './bip-form/assestment/assestment.component';
import { BehaviorAnalysisAssessmentComponent } from './bip-form/behavior-analysis-assessment/behavior-analysis-assessment.component';
import { BipFormComponent } from './bip-form/bip-form.component';
import { HypothesisBasedInterventionsComponent } from './bip-form/hypothesis-based-interventions/hypothesis-based-interventions.component';
import { InterventionsComponent } from './bip-form/interventions/interventions.component';
import { MaladaptivesComponent } from './bip-form/maladaptives/maladaptives.component';
import { PrevalentSettingComponent } from './bip-form/prevalent-setting/prevalent-setting.component';
import { ChartReductionComponent } from './charts/chart-reduction/chart-reduction.component';
import { ChartReplacementComponent } from './charts/chart-replacement/chart-replacement.component';
import { ConsentTreatmentFormComponent } from './consent-treatment-form/consent-treatment-form.component';
import { CrisisPlanComponent } from './crisis-plan/crisis-plan.component';
import { DeEscalationTecniquesComponent } from './de-escalation-tecniques/de-escalation-tecniques.component';
import { FamilyInvolvementGoalFormComponent } from './family-involvement-goal-form/family-involvement-goal-form.component';
import { GeneralizationTrainingComponent } from './generalization-training/generalization-training.component';
import { MonitoringEvaluatingComponent } from './monitoring-evaluating/monitoring-evaluating.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { ReductionGoalEditComponent } from './reduction-goal-edit/reduction-goal-edit.component';
import { ReductionGoalFormComponent } from './reduction-goal-form/reduction-goal-form.component';
import { ReplacementGoalFormComponent } from './replacement-goal-form/replacement-goal-form.component';
import { SustitutionListComponent } from './sustitution-list/sustitution-list.component';

@NgModule({
  declarations: [
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
  ],
  exports: [
    PatientFormComponent,
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
  ],
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
