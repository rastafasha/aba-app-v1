import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateResponse, ListParameters, ListResponse } from '../models';
import { catchError, of } from 'rxjs';

export class ApiV2Service<T> {
  constructor(protected http: HttpClient, protected endpoint: string) {}

  list(options: ListParameters = { per_page: 15 }) {
    const params = new HttpParams({ fromObject: options });
    const URL = this.endpoint;
    return this.http
      .get<ListResponse<T>>(URL, { params })
      .pipe(catchError(() => of({ data: null } as ListResponse<T>)));
  }

  get(id: number) {
    const URL = this.endpoint + '/' + id;
    return this.http.get<T>(URL);
  }

  create(data) {
    const URL = this.endpoint;
    return this.http.post<CreateResponse<T>>(URL, data);
  }

  update(data: T, id: number) {
    const URL = this.endpoint + '/' + id;
    return this.http.put<void>(URL, data);
  }

  delete(id: number) {
    const URL = this.endpoint + '/' + id;
    return this.http.delete<void>(URL);
  }
}
