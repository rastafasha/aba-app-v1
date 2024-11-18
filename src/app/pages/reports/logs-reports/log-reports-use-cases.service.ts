import { Injectable } from '@angular/core';
import { ClaimsService } from '../../claims/claims.service';

@Injectable({
  providedIn: 'root',
})
export class LogReportsUseCasesService {
  constructor(private claimsService: ClaimsService) {
    //
  }

  generateClaim(rbtExports: number[], bcbaExports: number[], filname: string) {
    return this.claimsService.generate({
      notes_rbt_ids: rbtExports,
      notes_bcba_ids: bcbaExports,
      file_name: filname,
    });
  }
}
