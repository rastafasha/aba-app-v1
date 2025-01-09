import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReplacementsComponent } from './replacements.component';

import { InterventionsComponent } from './interventions.component';
import { Interventions2Component } from './interventions2.component';

import { Replacements2Component } from './replacements2.component';
import { BehaviorsComponent } from './behaviors.component';
import { IntakeOutcomeComponent } from './intake-outcome.component';
import { NewListComponent } from './newlist.component';
import { InterventionViewComponent } from './interventions-vew.component';
import { BehaviorViewComponent } from './behaviors-vew.component';
import { interventions2ViewComponent } from './interventions2-vew.component';
import { NewlistViewComponent } from './newlist-vew.component';
import { IntakeOutcomeViewComponent } from './intake-out-view.component';



@NgModule({
  declarations: [

        InterventionsComponent,
        Interventions2Component,
        ReplacementsComponent,
        Replacements2Component,
        BehaviorsComponent,
        IntakeOutcomeComponent,
        NewListComponent,
        InterventionViewComponent,
        BehaviorViewComponent,
        interventions2ViewComponent,
        NewlistViewComponent,
        IntakeOutcomeViewComponent

  ],
  exports: [

        InterventionsComponent,
        Interventions2Component,
        ReplacementsComponent,
        Replacements2Component,
        BehaviorsComponent,
        IntakeOutcomeComponent,
        NewListComponent,
        InterventionViewComponent,
        BehaviorViewComponent,
        interventions2ViewComponent,
        NewlistViewComponent,
        IntakeOutcomeViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ComponentsBCBAModule { }
