import { baseUrl } from './routes';

export class TablesRoutes {
  static get basic(): string {
    return `${baseUrl}/tables/tables-basic`;
  }

  static get dataTables(): string {
    return `${baseUrl}/tables/tables-datatables`;
  }
}
