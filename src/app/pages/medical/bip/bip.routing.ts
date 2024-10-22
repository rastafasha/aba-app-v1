import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BipComponent } from './bip.component';
import { BipProfileComponent } from './bip-profile/bip-profile.component';
import { BipAttentionComponent } from './bip-attention/bip-attention.component';

const routes: Routes = [
  {
    path: '',
    component: BipComponent,
    children: [
      // {
      //   path:'goal/add', component:SustitutionGoalFormComponent
      // },
      // {
      //   path:'list', component:ListAppointmentsComponent
      // },
      {
        path: 'profile/:patient_id',
        component: BipProfileComponent,
      },
      {
        path: 'attention/:patient_id',
        component: BipAttentionComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BipRoutingModule {}
