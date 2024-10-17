import { baseUrl } from './routes';

export class FormsRoutes {
  static get base(): string {
    return `${baseUrl}/forms`;
  }

  static get basicInputs(): string {
    return `${baseUrl}/forms/form-basic-inputs`;
  }

  static get horizontal(): string {
    return `${baseUrl}/forms/form-horizontal`;
  }

  static get inputGroups(): string {
    return `${baseUrl}/forms/form-input-groups`;
  }

  static get vertical(): string {
    return `${baseUrl}/forms/form-vertical`;
  }
}
