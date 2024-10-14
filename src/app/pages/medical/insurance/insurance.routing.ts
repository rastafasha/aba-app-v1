import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceComponent } from './insurance.component';
import { InsuranceAddComponent } from './insurance-add/insurance-add.component';
import { InsuranceListComponent } from './insurance-list/insurance-list.component';
import { InsuranceEditComponent } from './insurance-edit/insurance-edit.component';
import { InsuranceViewComponent } from './insurance-view/insurance-view.component';
import { AppRoutes, lastRoutes } from 'src/app/shared/routes/routes';

const routes: Routes = [
  {
    path: '',
    component: InsuranceComponent,
    children: [
      {
        path: lastRoutes(AppRoutes.insurance.add),
        component: InsuranceAddComponent,
      },
      {
        path: lastRoutes(AppRoutes.insurance.list),
        component: InsuranceListComponent,
      },
      {
        path: lastRoutes(AppRoutes.insurance.edit, 2, '/:id'),
        component: InsuranceEditComponent,
      },
      {
        path: lastRoutes(AppRoutes.insurance.view, 1, '/:id'),
        component: InsuranceViewComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsuranceRoutingModule {}
