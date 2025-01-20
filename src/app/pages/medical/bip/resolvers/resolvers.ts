import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { map, of } from 'rxjs';
import { PatientV2 } from 'src/app/core/models';
import { PatientsV2Service } from 'src/app/core/services';

export const patientResolver: ResolveFn<PatientV2> = (
  route: ActivatedRouteSnapshot,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  state: RouterStateSnapshot
) => {
  if (route.paramMap.get('id')) {
    return inject(PatientsV2Service)
      .get(Number(route.paramMap.get('id')))
      .pipe(map((resp) => resp.data));
  }
  return of(undefined);
};
