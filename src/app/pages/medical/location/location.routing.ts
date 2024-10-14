import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationComponent } from './location.component';
import { LocationAddComponent } from './location-add/location-add.component';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationEditComponent } from './location-edit/location-edit.component';
import { LocationViewComponent } from './location-view/location-view.component';
import { AppRoutes, lastRoutes } from 'src/app/shared/routes/routes';

const routes: Routes = [
  {
    path: '',
    component: LocationComponent,
    children: [
      {
        path: lastRoutes(AppRoutes.location.register),
        component: LocationAddComponent,
      },
      {
        path: lastRoutes(AppRoutes.location.list),
        component: LocationListComponent,
      },
      {
        path: lastRoutes(AppRoutes.location.edit, 2, '/:id'),
        component: LocationEditComponent,
      },
      {
        path: lastRoutes(AppRoutes.location.view, 1, '/:id'),
        component: LocationViewComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationRoutingModule {}
