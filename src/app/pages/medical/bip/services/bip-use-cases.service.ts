import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { ApiV2Response, BipV2, PlanV2 } from 'src/app/core/models';
import { BipsV2Service, PlansV2Service } from 'src/app/core/services';
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

  private handlePlanChanges(
    newPlans: PlanV2[],
    oldPlans: PlanV2[],
    bipId: number
  ) {
    const operations: Observable<ApiV2Response<PlanV2>>[] = [];
    const stripIndex = (plan: PlanV2): PlanV2 => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { index, ...planWithoutIndex } = { ...plan };
      return planWithoutIndex;
    };

    // Handle updates and creates
    newPlans.forEach((plan) => {
      plan.bip_id = bipId;
      const oldPlan = oldPlans.find((p) => p.id === plan.id);

      if (!oldPlan) {
        // New plan - remove index before create
        operations.push(this.planService.create(stripIndex(plan)));
      } else if (
        JSON.stringify(stripIndex(plan)) !== JSON.stringify(stripIndex(oldPlan))
      ) {
        // Updated plan - remove index before update
        operations.push(this.planService.update(stripIndex(plan), plan.id));
      }
    });

    // Handle deletes
    oldPlans.forEach((oldPlan) => {
      if (!newPlans.find((p) => p.id === oldPlan.id)) {
        operations.push(this.planService.delete(oldPlan.id));
      }
    });

    return operations.length ? forkJoin(operations) : of(null);
  }

  save(bip: BipV2, old_bip: BipV2) {
    logTable(old_bip, bip);

    const planCategories: (keyof BipV2)[] = [
      'maladaptives',
      'replacements',
      'rbt_trainings',
      'caregiver_trainings',
    ];

    return of(null).pipe(
      // Handle all plan changes first
      switchMap(() => {
        const planOperations = planCategories.map((category) =>
          this.handlePlanChanges(
            bip[category as never],
            old_bip[category as never],
            bip.id
          )
        );
        return forkJoin(planOperations);
      }),
      // Then update the BIP
      switchMap(() => this.bipService.update(bip, bip.id)),
      switchMap((resp) => this.bipService.get(resp.data.id))
    );
  }

  constructor(
    private bipService: BipsV2Service,
    private planService: PlansV2Service
  ) {}
}
