import { Injectable } from '@angular/core';
import { forkJoin, of, switchMap } from 'rxjs';
import {
  BipV2,
  ConsentToTreatment,
  CrisisPlanV2,
  Objective,
  PlanV2,
} from 'src/app/core/models';
import {
  BipsV2Service,
  ConsentToTreatmentV2Service,
  CrisisPlansV2Service,
  ObjectivesV2Service,
  PlansV2Service,
} from 'src/app/core/services';
import { RepositoryUtils } from 'src/app/core/services/repository.utils';
import { logTable } from 'src/app/shared/utils';

@Injectable({
  providedIn: 'root',
})
export class BipUseCasesService {
  getBipByClientId(client_id: number) {
    return this.bipService
      .list({ client_id })
      .pipe(switchMap((resp) => this.bipService.get(resp.data[0].id)));
  }

  private handleObjectiveChanges(
    newObjectives: Objective[],
    oldObjectives: Objective[],
    planId: number
  ) {
    return this.repositoryUtils.handleEntityChanges(
      newObjectives,
      oldObjectives,
      this.objectiveService,
      (objective) => (objective.plan_id = planId)
    );
  }

  private handlePlanChanges(
    newPlans: PlanV2[],
    oldPlans: PlanV2[],
    bipId: number
  ) {
    // Handle updates and creates
    const planOperations = newPlans.map((plan) => {
      plan.bip_id = bipId;
      const oldPlan = oldPlans.find((p) => p.id === plan.id);

      if (!oldPlan || plan.id === 0) {
        return this.planService
          .create(this.repositoryUtils.stripIndex(plan))
          .pipe(
            switchMap((response) =>
              this.handleObjectiveChanges(plan.objectives, [], response.data.id)
            )
          );
      } else if (
        JSON.stringify(this.repositoryUtils.stripIndex(plan)) !==
        JSON.stringify(this.repositoryUtils.stripIndex(oldPlan))
      ) {
        return this.planService
          .update(this.repositoryUtils.stripIndex(plan), plan.id)
          .pipe(
            switchMap(() =>
              this.handleObjectiveChanges(
                plan.objectives,
                oldPlan.objectives,
                plan.id
              )
            )
          );
      } else {
        return this.handleObjectiveChanges(
          plan.objectives,
          oldPlan.objectives,
          plan.id
        );
      }
    });

    const deleteOperations = this.repositoryUtils.handleDeletes(
      oldPlans,
      newPlans,
      this.planService
    );

    return planOperations.length || deleteOperations.length
      ? forkJoin([...planOperations, ...deleteOperations])
      : of(null);
  }

  private handleCrisisPlanChanges(
    newPlan: CrisisPlanV2,
    oldPlan: CrisisPlanV2,
    bipId: number
  ) {
    const createAndUpdateOperations =
      this.repositoryUtils.handleUpdatesAndCreates(
        [newPlan],
        [oldPlan],
        this.crisisPlanService,
        (plan) => (plan.bip_id = bipId)
      );

    const deleteOperations = this.repositoryUtils.handleDeletes(
      [oldPlan],
      [newPlan],
      this.crisisPlanService
    );

    return createAndUpdateOperations.length || deleteOperations.length
      ? forkJoin([...createAndUpdateOperations, ...deleteOperations])
      : of(null);
  }
  private handleConsentToTreatmentChanges(
    newPlan: ConsentToTreatment,
    oldPlan: ConsentToTreatment,
    bipId: number
  ) {
    const createAndUpdateOperations =
      this.repositoryUtils.handleUpdatesAndCreates(
        [newPlan],
        [oldPlan],
        this.consentToTreatmentService,
        (plan) => (plan.bip_id = bipId)
      );

    const deleteOperations = this.repositoryUtils.handleDeletes(
      [oldPlan],
      [newPlan],
      this.consentToTreatmentService
    );

    return createAndUpdateOperations.length || deleteOperations.length
      ? forkJoin([...createAndUpdateOperations, ...deleteOperations])
      : of(null);
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
        // Add crisis plan and other handlers
        planOperations.push(
          this.handleCrisisPlanChanges(
            bip.crisis_plan,
            old_bip.crisis_plan,
            bip.id
          )
        );
        planOperations.push(
          this.handleConsentToTreatmentChanges(
            bip.consent_to_treatment,
            old_bip.consent_to_treatment,
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
    private planService: PlansV2Service,
    private objectiveService: ObjectivesV2Service,
    private consentToTreatmentService: ConsentToTreatmentV2Service,
    private crisisPlanService: CrisisPlansV2Service,
    private repositoryUtils: RepositoryUtils
  ) {}
}
