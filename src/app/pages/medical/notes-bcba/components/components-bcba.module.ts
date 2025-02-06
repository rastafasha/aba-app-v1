import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReplacementsComponent } from './replacements.component';

import { InterventionsComponent } from './interventions.component';
import { Interventions2Component } from './interventions2.component';

import { Replacements2Component } from './replacements2.component';
import { Replacements3Component } from './replacements3.component';
import { BehaviorsComponent } from './behaviors.component';
import { IntakeOutcomeComponent } from './intake-outcome.component';
import { NewListComponent } from './newlist.component';
import { InterventionViewComponent } from './interventions-vew.component';
import { BehaviorViewComponent } from './behaviors-vew.component';
import { interventions2ViewComponent } from './interventions2-vew.component';
import { NewlistViewComponent } from './newlist-vew.component';
import { IntakeOutcomeViewComponent } from './intake-out-view.component';
import { ReplacementViewComponent } from './replacements-vew.component';
import { Replacement2ViewComponent } from './replacements2-vew.component';
import { Show91756Component } from '../note-bcba/show91756/show91756.component';
import { Show91755Component } from '../note-bcba/show91755/show91755.component';
import { Show917512Component } from '../note-bcba/show917512/show917512.component';
import { Show917511Component } from '../note-bcba/show917511/show917511.component';
import { View917511Component } from '../note-bcba-view/view917511/view917511.component';
import { View917512Component } from '../note-bcba-view/view917512/view917512.component';
import { View91755Component } from '../note-bcba-view/view91755/view91755.component';
import { View91756Component } from '../note-bcba-view/view91756/view91756.component';
import { AssessmentToolsViewComponent } from './assessment-tools-view.component';
import { IntakeOutcomeMeasuresUsedComponent } from './intake-outcome-measures-used.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [
    InterventionsComponent,
    Interventions2Component,
    ReplacementsComponent,
    Replacements2Component,
    Replacements3Component,
    BehaviorsComponent,
    IntakeOutcomeComponent,
    NewListComponent,
    InterventionViewComponent,
    BehaviorViewComponent,
    interventions2ViewComponent,
    NewlistViewComponent,
    IntakeOutcomeViewComponent,
    ReplacementViewComponent,
    Replacement2ViewComponent,
    Show91756Component,
    Show91755Component,
    Show917512Component,
    Show917511Component,
    View917511Component,
    View917512Component,
    View91755Component,
    View91756Component,
    AssessmentToolsViewComponent,
    IntakeOutcomeMeasuresUsedComponent,
  ],
  exports: [
    InterventionsComponent,
    Interventions2Component,
    ReplacementsComponent,
    Replacements2Component,
    Replacements3Component,
    BehaviorsComponent,
    IntakeOutcomeComponent,
    NewListComponent,
    InterventionViewComponent,
    BehaviorViewComponent,
    interventions2ViewComponent,
    NewlistViewComponent,
    IntakeOutcomeViewComponent,
    ReplacementViewComponent,
    Replacement2ViewComponent,
    Show91756Component,
    Show91755Component,
    Show917512Component,
    Show917511Component,
    View917511Component,
    View917512Component,
    View91755Component,
    View91756Component,
    AssessmentToolsViewComponent,
    IntakeOutcomeMeasuresUsedComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ComponentsBCBAModule { }
