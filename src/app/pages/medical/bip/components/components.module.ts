import { NgModule } from '@angular/core';
import { BipFormComponent } from './bipform/bipform.component';
import { ReductionGoalFormComponent } from './reduction-goal-form/reduction-goal-form.component';
import { FamilyInvolvementGoalFormComponent } from './family-involvement-goal-form/family-involvement-goal-form.component';
import { MonitoringEvaluatingComponent } from './monitoring-evaluating/monitoring-evaluating.component';
import { BehaviorAssistantComponent } from './behavior-assistant/behavior-assistant.component';
import { GeneralizationTrainingComponent } from './generalization-training/generalization-training.component';
import { CrisisPlanComponent } from './crisis-plan/crisis-plan.component';
import { DeEscalationTecniquesComponent } from './de-escalation-tecniques/de-escalation-tecniques.component';
import { ConsentTreatmentFormComponent } from './consent-treatment-form/consent-treatment-form.component';
import { SustitutionListComponent } from './sustitution-list/sustitution-list.component';
import { ChartReductionComponent } from './charts/chart-reduction/chart-reduction.component';
import { ChartReplacementComponent } from './charts/chart-replacement/chart-replacement.component';
import { ReductionGoalEditComponent } from './reduction-goal-edit/reduction-goal-edit.component';
import { ReplacementGoalFormComponent } from './replacement-goal-form/replacement-goal-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

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
  ],
  exports: [
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
