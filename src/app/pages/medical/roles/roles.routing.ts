import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRoleUserComponent } from './add-role-user/add-role-user.component';
import { RolesComponent } from './roles.component';
import { ListRoleUserComponent } from './list-role-user/list-role-user.component';
import { EditRoleUserComponent } from './edit-role-user/edit-role-user.component';
import { AppRoutes, lastRoutes } from 'src/app/shared/routes/routes';

const routes: Routes = [
  {
    path: '',
    component: RolesComponent,
    children: [
      {
        path: lastRoutes(AppRoutes.roles.register),
        component: AddRoleUserComponent,
      },
      {
        path: lastRoutes(AppRoutes.roles.list),
        component: ListRoleUserComponent,
      },
      {
        path: lastRoutes(AppRoutes.roles.edit, 2, '/:id'),
        component: EditRoleUserComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule {}
