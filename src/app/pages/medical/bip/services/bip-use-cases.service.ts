import { Injectable } from '@angular/core';
import { forkJoin, of, switchMap, Observable, map } from 'rxjs';
import {
  BipV2,
  CrisisPlanV2,
  DeEscalationTechnique,
  GeneralizationTraining,
  Objective,
  PlanV2,
} from 'src/app/core/models';
import {
  BipsV2Service,
  CrisisPlansV2Service,
  ObjectivesV2Service,
  PlansV2Service,
} from 'src/app/core/services';
import { RepositoryUtils } from 'src/app/core/services/repository.utils';
import { logTable } from 'src/app/shared/utils';
import { DeEscalationTechniquesV2Service } from 'src/app/core/services/de-escalation-techniques.v2.service';
import { GeneralizationTrainingsV2Service } from 'src/app/core/services/generalization-trainings.v2.service';

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

      if (!oldPlan) {
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
    newPlans: CrisisPlanV2[],
    oldPlans: CrisisPlanV2[],
    bipId: number
  ) {
    const createAndUpdateOperations =
      this.repositoryUtils.handleUpdatesAndCreates(
        newPlans,
        oldPlans,
        this.crisisPlanService,
        (plan) => (plan.bip_id = bipId)
      );

    const deleteOperations = this.repositoryUtils.handleDeletes(
      oldPlans,
      newPlans,
      this.crisisPlanService
    );

    return createAndUpdateOperations.length || deleteOperations.length
      ? forkJoin([...createAndUpdateOperations, ...deleteOperations])
      : of(null);
  }

  private handleDeEscalationTechniqueChanges(
    newTechniques: DeEscalationTechnique[],
    oldTechniques: DeEscalationTechnique[],
    bipId: number
  ): Observable<unknown[]> {
    const operations = this.repositoryUtils.handleEntityChanges(
      newTechniques,
      oldTechniques,
      this.deEscalationService,
      (technique) => {
        technique.bip_id = bipId;
        technique.recomendation_lists?.forEach((rec, index) => {
          rec.de_escalation_technique_id = technique.id;
          rec.index = index;
        });
      }
    );

    return operations.pipe(map((result) => (result ? [result] : [])));
  }

  private handleGeneralizationTrainingChanges(
    newTrainings: GeneralizationTraining[],
    oldTrainings: GeneralizationTraining[],
    bipId: number
  ): Observable<unknown[]> {
    const operations = this.repositoryUtils.handleEntityChanges(
      newTrainings,
      oldTrainings,
      this.generalizationTrainingService,
      (training) => (training.bip_id = bipId)
    );

    return operations.pipe(map((result) => (result ? [result] : [])));
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
            bip.crisis_plans,
            old_bip.crisis_plans,
            bip.id
          ),
          this.handleDeEscalationTechniqueChanges(
            bip.de_escalation_techniques,
            old_bip.de_escalation_techniques,
            bip.id
          ),
          this.handleGeneralizationTrainingChanges(
            bip.generalization_trainings,
            old_bip.generalization_trainings,
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
    private crisisPlanService: CrisisPlansV2Service,
    private deEscalationService: DeEscalationTechniquesV2Service,
    private generalizationTrainingService: GeneralizationTrainingsV2Service,
    private repositoryUtils: RepositoryUtils
  ) {}
}
