import { baseUrl } from './routes';

export class PatientsRoutes {
  static get patients(): string {
    return `${baseUrl}/patients`;
  }

  static get edit(): string {
    return `${baseUrl}/patients/edit-patient`;
  }

  static get profile(): string {
    return `${baseUrl}/patients/patient-profile`;
  }

  static get setting(): string {
    return `${baseUrl}/patients/patient-setting`;
  }

  static get add(): string {
    return `${baseUrl}/patients/add`;
  }

  static get list(): string {
    return `${baseUrl}/patients/list`;
  }

  static get logReport(): string {
    return `${baseUrl}/patients/ws`;
  }
}
