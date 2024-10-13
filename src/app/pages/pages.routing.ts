import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'medical',
    loadChildren: () =>
      import('./medical/medical.module').then((m) => m.MedicalModule),
  },
  {
    path: 'doctors',
    loadChildren: () =>
      import('./medical/doctors/doctors.module').then((m) => m.DoctorsModule),
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('./medical/patient-m/patient-m.module').then(
        (m) => m.PatientMModule
      ),
  },
  {
    path: 'roles',
    loadChildren: () =>
      import('./medical/roles/roles.module').then((m) => m.RolesModule),
  },
  {
    path: 'insurance',
    loadChildren: () =>
      import('./medical/insurance/insurance.module').then(
        (m) => m.InsuranceModule
      ),
  },
  {
    path: 'bip',
    loadChildren: () =>
      import('./medical/bip/bip.module').then((m) => m.BipModule),
  },
  {
    path: 'location',
    loadChildren: () =>
      import('./medical/location/location.module').then(
        (m) => m.LocationModule
      ),
  },
  {
    path: 'note-rbt',
    loadChildren: () =>
      import('./medical/notes/notes.module').then((m) => m.NotesModule),
  },
  {
    path: 'note-bcba',
    loadChildren: () =>
      import('./medical/notes-bcba/notes-bcba.module').then(
        (m) => m.NotesBcbaModule
      ),
  },
  {
    path: 'client-report',
    loadChildren: () =>
      import('./medical/client-report/client-report.module').then(
        (m) => m.ClientReportModule
      ),
  },
  // EXTRAS
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'doctor',
    loadChildren: () =>
      import('./doctor/doctor.module').then((m) => m.DoctorModule),
  },
  {
    path: 'patient',
    loadChildren: () =>
      import('./patient/patient.module').then((m) => m.PatientModule),
  },
  {
    path: 'staff',
    loadChildren: () =>
      import('./staff/staff.module').then((m) => m.StaffModule),
  },
  {
    path: 'appointments',
    loadChildren: () =>
      import('./appointments/appointments.module').then(
        (m) => m.AppointmentsModule
      ),
  },
  {
    path: 'doctor-schedule',
    loadChildren: () =>
      import('./doctor-schedule/doctor-schedule.module').then(
        (m) => m.DoctorScheduleModule
      ),
  },
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

  {
    path: 'calls',
    loadChildren: () =>
      import('./calls/calls.module').then((m) => m.CallsModule),
  },
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
    path: 'reports',
    loadChildren: () =>
      import('./reports/reports.module').then((m) => m.ReportsModule),
  },
  {
    path: 'invoice',
    loadChildren: () =>
      import('./invoice/invoice.module').then((m) => m.InvoiceModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'edit-profile',
    loadChildren: () =>
      import('./edit-profile/edit-profile.module').then(
        (m) => m.EditProfileModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
