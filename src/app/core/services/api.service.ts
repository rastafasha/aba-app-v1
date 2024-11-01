import { HttpClient } from '@angular/common/http';

export abstract class ApiService<T = any> {
  constructor(protected http: HttpClient, protected baseUrl: string) {}
}
