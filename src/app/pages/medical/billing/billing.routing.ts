import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingComponent } from './billing.component';
import { BillingListComponent } from './billing-list/billing-list.component';
import { BillingByClientComponent } from './billing-by-client/billing-by-client.component';
import { AppRoutes, lastRoutes } from 'src/app/shared/routes/routes';

const routes: Routes = [
  {
    path: '',
    component: BillingComponent,
    children: [
      {
        path: lastRoutes(AppRoutes.billing.list),
        component: BillingListComponent,
      },
      {
        path: lastRoutes(AppRoutes.billing.list, 1, '/:id'),
        component: BillingByClientComponent,
      },
      // {
      //   path:'attention/:id', component:BipattentionComponent
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillingRoutingModule {}
