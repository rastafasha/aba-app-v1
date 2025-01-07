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



@NgModule({
  declarations: [

        InterventionsComponent,
        ReplacementsComponent,
        Interventions2Component,
        Replacements2Component,
        BehaviorsComponent,
        IntakeOutcomeComponent,
        NewListComponent
  ],
  exports: [

        InterventionsComponent,
        ReplacementsComponent,
        Interventions2Component,
        Replacements2Component,
        BehaviorsComponent,
        IntakeOutcomeComponent,
        NewListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ComponentsBCBAModule { }
