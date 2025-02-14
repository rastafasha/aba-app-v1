import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddPatientMComponent } from './add-patient-m/add-patient-m.component';
import { EditPatientMComponent } from './edit-patient-m/edit-patient-m.component';
import { ListPatientMComponent } from './list-patient-m/list-patient-m.component';
import { PatientMComponent } from './patient-m.component';
import { PatientMRoutingModule } from './patient-m.routing';
import { ProfilePatientMComponent } from './profile-patient-m/profile-patient-m.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LayoutModule } from '../../../layout/layout.module';
import { ClientLogReportComponent } from './client-log-report/client-log-report.component';
import { EditPaServiceModalComponent } from './edit-pa-service-modal/edit-pa-service-modal.component';

@NgModule({
  declarations: [
    PatientMComponent,
    AddPatientMComponent,
    ListPatientMComponent,
    EditPatientMComponent,
    ProfilePatientMComponent,
    ClientLogReportComponent,
    EditPaServiceModalComponent,
  ],
  imports: [
    CommonModule,
    PatientMRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    PdfViewerModule,
    MatDialogModule,
    MatButtonModule,
    LayoutModule,
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ]
})
export class PatientMModule {}
