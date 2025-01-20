import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BipAttentionComponent } from './bip-attention/bip-attention.component';
import { BipProfileComponent } from './bip-profile/bip-profile.component';
import { BipComponent } from './bip.component';
import { patientResolver } from './resolvers/resolvers';
import { AppRoutes, lastRoutes } from 'src/app/shared/routes/routes';

const routes: Routes = [
  {
    path: '',
    component: BipComponent,
    children: [
      {
        path: lastRoutes(AppRoutes.bip.profile, 1, '/:patient_id'),
        component: BipProfileComponent,
        resolve: { patient: patientResolver },
      },
      {
        path: lastRoutes(AppRoutes.bip.show, 2, '/:id'),
        component: BipProfileComponent,
        resolve: { patient: patientResolver },
      },
      {
        path: lastRoutes(AppRoutes.bip.attention, 1, '/:patient_id'),
        component: BipAttentionComponent,
        resolve: { patient: patientResolver },
      },
      {
        path: lastRoutes(AppRoutes.bip.edit, 2, '/:id'),
        redirectTo: lastRoutes(AppRoutes.bip.edit, 2, '/:id/1'),
      },
      {
        path: lastRoutes(AppRoutes.bip.edit, 2, '/:id/:selected'),
        component: BipAttentionComponent,
        resolve: { patient: patientResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BipRoutingModule {}
