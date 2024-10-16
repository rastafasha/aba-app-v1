import { baseUrl } from './routes';

export class PatientsRoutes {
  static get patients(): string {
    return `${baseUrl}/patients`;
  }

  static get edit(): string {
    return `${baseUrl}/patients/edit-patient`;
  }

  static get profile(): string {
    return `${baseUrl}/patients/profile`;
  }

  static get setting(): string {
    return `${baseUrl}/patients/setting`;
  }

  static get add(): string {
    return `${baseUrl}/patients/add`;
  }

  static get list(): string {
    return `${baseUrl}/patients/list`;
  }

  static get listEdit(): string {
    return `${baseUrl}/patients/list/edit`;
  }

  static get logReport(): string {
    return `${baseUrl}/patients/ws`;
  }
}
