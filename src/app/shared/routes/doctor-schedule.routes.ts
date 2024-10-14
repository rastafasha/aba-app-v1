import { baseUrl } from './routes';

export class DoctorScheduleRoutes {
  static get doctorSchedule(): string {
    return `${baseUrl}/doctor-schedule`;
  }
  static get add(): string {
    return `${baseUrl}/doctor-schedule/add-schedule`;
  }

  static get edit(): string {
    return `${baseUrl}/doctor-schedule/edit-schedule`;
  }

  static get schedule(): string {
    return `${baseUrl}/doctor-schedule/schedule`;
  }
}
