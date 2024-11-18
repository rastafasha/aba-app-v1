import { HttpClient, HttpParams } from '@angular/common/http';
import {
  ApiV2Response,
  CreateResponse,
  ListParameters,
  ListResponse,
} from '../models';
import { catchError, map, Observable, of } from 'rxjs';

export abstract class RepositoryV2Service<T> {
  constructor(protected http: HttpClient, protected endpoint: string) {}

  list(
    options: ListParameters = { per_page: 15 }
  ): Observable<ListResponse<T>> {
    const params = new HttpParams({ fromObject: options });
    const URL = this.endpoint;
    return this.http.get<ApiV2Response<ListResponse<T>>>(URL, { params }).pipe(
      catchError(() =>
        of({ data: null, status: 'error' } as ApiV2Response<ListResponse<T>>)
      ),
      map((response) => ({
        ...response.data,
        data: response.data.data.map((item) => this.transform(item)),
      }))
    );
  }

  get(id: number): Observable<ApiV2Response<T>> {
    const URL = this.endpoint + '/' + id;
    return this.http.get<ApiV2Response<T>>(URL).pipe(
      catchError(() => of({ data: null, status: 'error' } as ApiV2Response<T>)),
      map((response) => ({ ...response, data: this.transform(response.data) }))
    );
  }

  create(data) {
    const URL = this.endpoint;
    return this.http.post<CreateResponse<T>>(URL, data);
  }

  update(data: T, id: number) {
    console.log(data);
    const URL = this.endpoint + '/' + id;
    return this.http.put<void>(URL, data);
  }

  delete(id: number) {
    const URL = this.endpoint + '/' + id;
    return this.http.delete<void>(URL);
  }

  abstract transform(data: unknown): T;
}
