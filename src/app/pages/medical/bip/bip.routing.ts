import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BipShowComponent } from './bip-show/bip-show.component';
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
        component: BipShowComponent,
        resolve: { patient: patientResolver },
      },
      {
        path: lastRoutes(AppRoutes.bip.show, 2, '/:id'),
        component: BipShowComponent,
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
