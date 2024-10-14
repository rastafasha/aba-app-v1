import { AccountsRoutes } from './accounts.routes';
import { AppointmentsRoutes } from './appointments.routes';
import { AuthRoutes } from './auth.routes';
import { AssetsRoutes } from './assets.routes';
import { BlogsRoutes } from './blogs.routes';
import { CallsRoutes } from './calls.routes';
import { ChatRoutes } from './chat.routes';
import { ComponentsRoutes } from './components.routes';
import { DashboardRoutes } from './dashboard.routes';
import { SpecialitiesRoutes } from './specialities.routes';
import { DepartmentsRoutes } from './departments.routes';
import { DoctorsRoutes } from './doctors.routes';
import { DoctorScheduleRoutes } from './doctor-schedule.routes';
import { StaffRoutes } from './staff.routes';
import { NoteBcbaRoutes } from './note-bcba.routes';
import { NoteRbtRoutes } from './note-rbt.routes';
import { LocationRoutes } from './location.routes';
import { BipRoutes } from './bip.routes';
import { InsuranceRoutes } from './insurance.routes';
import { RolesRoutes } from './roles.routes';
import { ErrorRoutes } from './error.routes';
import { TablesRoutes } from './tables.routes';
import { FormsRoutes } from './forms.routes';
import { GalleryRoutes } from './gallery.routes';
import { InvoiceRoutes } from './invoice.routes';
import { SettingsRoutes } from './settings.routes';
import { PatientsRoutes } from './patients.routes';
import { PayrollRoutes } from './payroll.routes';
import { EmailRoutes } from './email.routes';
import { ClientReportRoutes } from './client-report.routes';
import { MedicalRoutes } from './medical.routes';
import { BillingRoutes } from './BillingRoutes';

export const baseUrl: string = '';

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
  static get activities(): string {
    return `${baseUrl}/activities`;
  }
  static get assets(): typeof AssetsRoutes {
    return AssetsRoutes;
  }
  static get billing(): typeof BillingRoutes {
    return BillingRoutes;
  }

  static get blankPage(): string {
    return `${baseUrl}/blank-page`;
  }
  // static get blogs(): typeof BlogsRoutes {
  //   return BlogsRoutes;
  // }
  //static get calendar(): string {
  // `  return ${baseUrl}/calendar`;
  // }
  static get calendar(): string {
    return `${baseUrl}/appointment-calendar/show`;
  }
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
  static get salary(): string {
    return `${baseUrl}/appointment-pay/list`;
  }

  static get profile(): string {
    return `${baseUrl}/profile`;
  }
  static get editProfile(): string {
    return `${baseUrl}/edit-profile`;
  }
  static get expenseReports(): string {
    return `${baseUrl}/reports/expense-reports`;
  }
  static get invoiceReports(): string {
    return `${baseUrl}/reports/invoice-reports`;
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
  const result = path.join('/') + extra;
  console.log(result);
  return result;
};
