import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { BipV2 } from 'src/app/core/models';
import { BipsV2Service } from 'src/app/core/services';
import { logTable } from 'src/app/shared/utils';

@Injectable({
  providedIn: 'root',
})
export class BipUseCasesService {
  getBipByClientId(client_id: number) {
    return this.bipService.list({ client_id }).pipe(
      switchMap((resp) => this.bipService.get(resp.data[0].id)),
      map((resp) => {
        resp.data.replacements = resp.data.replacements.map((item, index) => ({
          ...item,
          index: index + 1,
        }));
        return resp;
      })
    );
  }

  save(bip: BipV2, old_bip: BipV2) {
    logTable(bip, old_bip);
    return this.bipService.update(bip, bip.id);
  }

  constructor(private bipService: BipsV2Service) {}
}
