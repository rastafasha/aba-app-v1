import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Claim, ClaimStatus } from './models/claim.model';
import { url_servicios } from 'src/app/config/config';
import { map } from 'rxjs';


interface ClaimsResponse {
  data: {
    [key: string]: string | number;
  }[];
}

interface ClaimMDResponse {
  data: {
      "status": string;
      "message": string;
  }
}

const options = {
  headers: {
    'Accept': 'application/json',
  },
}

@Injectable({
  providedIn: 'root',
})
export class ClaimsService {
  constructor(public http: HttpClient) {}

  getAll(page = 1) {
    const URL = url_servicios + '/v2/claims';
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<{data: ClaimsResponse}>(URL, {params, ...options})
      .pipe(
        map(response => {
          const data = response.data.data;
          console.log(data, 'data');
          return data.map(claim => ({
            id: claim['id'] as number,
            filename: (claim['filename'] || 'unknown.dat') as string,
            status: claim['status'] as ClaimStatus,
            createdAt: claim['created_at'] as string,
            updatedAt: (claim['updated_at'] || null) as string | null,
            bcbcNotesIds: (claim['bcbc_notes_ids'] || []) as number[],
            rbtNotesIds: (claim['rbt_notes_ids'] || []) as number[],
            content: (claim['content'] || '') as string,
          }))
        })
      );
  }

  send(id: number) {
    const URL = url_servicios + '/v2/claims/' + id.toString() + '/send-to-claim-md';
    return this.http.post<ClaimMDResponse>(URL, {}, options);
  }

  create(data: Partial<Claim>) {
    const URL = url_servicios + '/v2/claims';
    return this.http.post<Claim>(URL, data, options);
  }
}
