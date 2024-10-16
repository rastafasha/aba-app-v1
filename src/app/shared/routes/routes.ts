import { AccountsRoutes } from './accounts.routes';
import { AppointmentsRoutes } from './appointments.routes';
import { AssetsRoutes } from './assets.routes';
import { ActivityRoutes } from './activity.routes';
import { PagesRoutes } from './pages.routes';
import { ProfileRoutes } from './profile.routes';
import { ReportRoutes } from './report.routes';
import { AuthRoutes } from './auth.routes';
import { BillingRoutes } from './billing.routes';
import { BipRoutes } from './bip.routes';
import { CallsRoutes } from './calls.routes';
import { ChatRoutes } from './chat.routes';
import { ClientReportRoutes } from './client-report.routes';
import { ComponentsRoutes } from './components.routes';
import { DashboardRoutes } from './dashboard.routes';
import { DepartmentsRoutes } from './departments.routes';
import { DoctorScheduleRoutes } from './doctor-schedule.routes';
import { DoctorsRoutes } from './doctors.routes';
import { EmailRoutes } from './email.routes';
import { ErrorRoutes } from './error.routes';
import { FormsRoutes } from './forms.routes';
import { GalleryRoutes } from './gallery.routes';
import { InsuranceRoutes } from './insurance.routes';
import { InvoiceRoutes } from './invoice.routes';
import { LocationRoutes } from './location.routes';
import { MedicalRoutes } from './medical.routes';
import { NoteBcbaRoutes } from './note-bcba.routes';
import { NoteRbtRoutes } from './note-rbt.routes';
import { PatientsRoutes } from './patients.routes';
import { PayrollRoutes } from './payroll.routes';
import { RolesRoutes } from './roles.routes';
import { SettingsRoutes } from './settings.routes';
import { SpecialitiesRoutes } from './specialities.routes';
import { StaffRoutes } from './staff.routes';
import { TablesRoutes } from './tables.routes';

export const baseUrl = '';

export class AppRoutes {
  static get auth(): typeof AuthRoutes {
    return AuthRoutes;
  }
  static get accounts(): typeof AccountsRoutes {
    return AccountsRoutes;
  }
  static get appointments(): typeof AppointmentsRoutes {
    return AppointmentsRoutes;
  }
  static get activities(): typeof ActivityRoutes {
    return ActivityRoutes;
  }
  static get assets(): typeof AssetsRoutes {
    return AssetsRoutes;
  }
  static get billing(): typeof BillingRoutes {
    return BillingRoutes;
  }
  static get pages(): typeof PagesRoutes {
    return PagesRoutes;
  }
  // static get blogs(): typeof BlogsRoutes {
  //   return BlogsRoutes;
  // }
  //static get calendar(): string {
  // `  return ${baseUrl}/calendar`;
  // }
  static get calls(): typeof CallsRoutes {
    return CallsRoutes;
  }
  static get chat(): typeof ChatRoutes {
    return ChatRoutes;
  }
  static get components(): typeof ComponentsRoutes {
    return ComponentsRoutes;
  }
  static get dashboard(): typeof DashboardRoutes {
    return DashboardRoutes;
  }
  static get specialities(): typeof SpecialitiesRoutes {
    return SpecialitiesRoutes;
  }
  static get departments(): typeof DepartmentsRoutes {
    return DepartmentsRoutes;
  }
  static get medical(): typeof MedicalRoutes {
    return MedicalRoutes;
  }
  static get doctors(): typeof DoctorsRoutes {
    return DoctorsRoutes;
  }
  static get doctorSchedule(): typeof DoctorScheduleRoutes {
    return DoctorScheduleRoutes;
  }
  static get email(): typeof EmailRoutes {
    return EmailRoutes;
  }
  static get forms(): typeof FormsRoutes {
    return FormsRoutes;
  }
  static get gallery(): typeof GalleryRoutes {
    return GalleryRoutes;
  }
  static get invoice(): typeof InvoiceRoutes {
    return InvoiceRoutes;
  }
  static get patients(): typeof PatientsRoutes {
    return PatientsRoutes;
  }
  static get payroll(): typeof PayrollRoutes {
    return PayrollRoutes;
  }
  //static get salary(): string {
  // `  return ${baseUrl}/payroll/salary`;
  // }
  static get profile(): typeof ProfileRoutes {
    return ProfileRoutes;
  }
  static get reports(): typeof ReportRoutes {
    return ReportRoutes;
  }
  static get settings(): typeof SettingsRoutes {
    return SettingsRoutes;
  }
  static get staff(): typeof StaffRoutes {
    return StaffRoutes;
  }
  static get tables(): typeof TablesRoutes {
    return TablesRoutes;
  }
  static get error(): typeof ErrorRoutes {
    return ErrorRoutes;
  }
  static get roles(): typeof RolesRoutes {
    return RolesRoutes;
  }
  static get insurance(): typeof InsuranceRoutes {
    return InsuranceRoutes;
  }
  static get bip(): typeof BipRoutes {
    return BipRoutes;
  }
  static get location(): typeof LocationRoutes {
    return LocationRoutes;
  }
  static get noteRbt(): typeof NoteRbtRoutes {
    return NoteRbtRoutes;
  }
  static get noteBcba(): typeof NoteBcbaRoutes {
    return NoteBcbaRoutes;
  }
  static get clientReport(): typeof ClientReportRoutes {
    return ClientReportRoutes;
  }
}

export const lastRoutes = (route: string, deep = 1, extra = ''): string => {
  const routes = route.split('/');
  const path = routes.slice(routes.length - deep);
  return path.join('/') + extra;
};
