import { baseUrl } from './routes';

export class AppointmentsRoutes {
  static get add(): string {
    return `${baseUrl}/appointments/add`;
  }

  static get list(): string {
    return `${baseUrl}/appointments/list`;
  }
  static get listEdit(): string {
    return `${baseUrl}/appointments/list/edit`;
  }

  static get edit(): string {
    return `${baseUrl}/appointments/edit`;
  }

  static get citaMedica(): string {
    return `${baseUrl}/appointments/cita-medica`;
  }

  static get show(): string {
    return `${baseUrl}/appointment-calendar/show`;
  }

  static get salary(): string {
    return `${baseUrl}/appointment-pay/list`;
  }
}
