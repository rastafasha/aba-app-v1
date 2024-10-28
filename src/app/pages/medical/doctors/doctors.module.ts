import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorsRoutingModule } from './doctors.routing';
import { DoctorsComponent } from './doctors.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';
import { ListDoctorComponent } from './list-doctor/list-doctor.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileDoctorComponent } from './profile-doctor/profile-doctor.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { LayoutModule } from '../../../layout/layout.module';

@NgModule({
  declarations: [
    DoctorsComponent,
    AddDoctorComponent,
    EditDoctorComponent,
    ListDoctorComponent,
    ProfileDoctorComponent,
  ],
  exports: [
    DoctorsComponent,
    AddDoctorComponent,
    EditDoctorComponent,
    ListDoctorComponent,
    ProfileDoctorComponent,
  ],
  imports: [
    CommonModule,
    DoctorsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    PipesModule,
    LayoutModule,
  ],
})
export class DoctorsModule {}
