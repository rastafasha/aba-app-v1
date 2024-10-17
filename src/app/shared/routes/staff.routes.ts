import { baseUrl } from './routes';

export class StaffRoutes {
  static get addLeave(): string {
    return `${baseUrl}/staff/add-leave`;
  }

  static get add(): string {
    return `${baseUrl}/staffs/add-staff`;
  }

  static get editLeave(): string {
    return `${baseUrl}/staff/edit-leave`;
  }

  static get edit(): string {
    return `${baseUrl}/staff/edit-staff`;
  }

  static get attendance(): string {
    return `${baseUrl}/staff/staff-attendance`;
  }

  static get holiday(): string {
    return `${baseUrl}/staff/staff-holiday`;
  }

  static get leave(): string {
    return `${baseUrl}/staff/staff-leave`;
  }

  static get list(): string {
    return `${baseUrl}/staffs/list`;
  }

  static get profile(): string {
    return `${baseUrl}/staff/staff-profile`;
  }

  static get setting(): string {
    return `${baseUrl}/staff/staff-setting`;
  }
}
