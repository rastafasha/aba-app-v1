import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from '../core/core.component';
import { AppRoutes, lastRoutes } from '../shared/routes/routes';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: lastRoutes(AppRoutes.roles.roles),
        loadChildren: () =>
          import('./medical/roles/roles.module').then((m) => m.RolesModule),
      },

      {
        path: lastRoutes(AppRoutes.doctors.doctors),
        loadChildren: () =>
          import('./medical/doctors/doctors.module').then(
            (m) => m.DoctorsModule
          ),
      },
      {
        path: lastRoutes(AppRoutes.patients.patients),
        loadChildren: () =>
          import('./medical/patient-m/patient-m.module').then(
            (m) => m.PatientMModule
          ),
      },

      {
        path: lastRoutes(AppRoutes.bip.bip),
        loadChildren: () =>
          import('./medical/bip/bip.module').then((m) => m.BipModule),
      },

      {
        path: lastRoutes(AppRoutes.insurance.insurance),
        loadChildren: () =>
          import('./medical/insurance/insurance.module').then(
            (m) => m.InsuranceModule
          ),
      },

      {
        path: lastRoutes(AppRoutes.location.location),
        loadChildren: () =>
          import('./medical/location/location.module').then(
            (m) => m.LocationModule
          ),
      },
      {
        path: lastRoutes(AppRoutes.noteRbt.noteRbt),
        loadChildren: () =>
          import('./medical/notes/notes.module').then((m) => m.NotesModule),
      },

      {
        path: lastRoutes(AppRoutes.noteBcba.noteBcba),
        loadChildren: () =>
          import('./medical/notes-bcba/notes-bcba.module').then(
            (m) => m.NotesBcbaModule
          ),
      },
      {
        path: lastRoutes(AppRoutes.billing.billing),
        loadChildren: () =>
          import('./medical/client-report/client-report.module').then(
            (m) => m.ClientReportModule
          ),
      },
      {
        path: lastRoutes(AppRoutes.clientReport.clientReport),
        loadChildren: () =>
          import('./medical/client-report/client-report.module').then(
            (m) => m.ClientReportModule
          ),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./reports/reports.module').then((m) => m.ReportsModule),
      },
      // EXTRAS
      {
        path: lastRoutes(AppRoutes.dashboard.dashboard),
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: lastRoutes(AppRoutes.doctorSchedule.doctorSchedule),
        loadChildren: () =>
          import('./doctor-schedule/doctor-schedule.module').then(
            (m) => m.DoctorScheduleModule
          ),
      },
      {
        path: lastRoutes(AppRoutes.settings.setting),
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: lastRoutes(AppRoutes.profile.profile),
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: lastRoutes(AppRoutes.profile.edit),
        loadChildren: () =>
          import('./edit-profile/edit-profile.module').then(
            (m) => m.EditProfileModule
          ),
      },
      {
        path: 'doctor',
        loadChildren: () =>
          import('./doctor/doctor.module').then((m) => m.DoctorModule),
      },
      // {
      //   path: 'patient',
      //   loadChildren: () =>
      //     import('./patient/patient.module').then((m) => m.PatientModule),
      // },
      {
        path: 'staff',
        loadChildren: () =>
          import('./staff/staff.module').then((m) => m.StaffModule),
      },

      /*
      {
        path: 'appointments',
        loadChildren: () =>
          import('./appointments/appointments.module').then(
            (m) => m.AppointmentsModule
          ),
      },
      */

      /*
      {
        path: 'departments',
        loadChildren: () =>
          import('./departments/departments.module').then(
            (m) => m.DepartmentsModule
          ),
      },
      {
        path: 'accounts',
        loadChildren: () =>
          import('./accounts/accounts.module').then((m) => m.AccountsModule),
      },
      {
        path: 'payroll',
        loadChildren: () =>
          import('./payroll/payroll.module').then((m) => m.PayrollModule),
      },
      /*
      {
        path: 'calls',
        loadChildren: () =>
          import('./calls/calls.module').then((m) => m.CallsModule),
      },
      /*
      {
        path: 'email',
        loadChildren: () =>
          import('./email/email.module').then((m) => m.EmailModule),
      },

      {
        path: 'assets',
        loadChildren: () =>
          import('./assets/assets.module').then((m) => m.AssetsModule),
      },
     
      {
        path: 'invoice',
        loadChildren: () =>
          import('./invoice/invoice.module').then((m) => m.InvoiceModule),
      },
*/
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
