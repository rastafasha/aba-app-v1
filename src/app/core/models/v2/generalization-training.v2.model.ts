import {
  NumberOrNullOrUndefined,
  StringOrNullOrUndefined,
  ForceMap,
  DateOrNullOrUndefined,
} from 'src/app/shared/utils';

export type PhaseOption = `Phase ${'1' | '2' | '3' | '4' | '5' | '6'}`;
export const deafultTransitionFadingPlan: Record<PhaseOption, string> = {
  'Phase 1':
    'All maladaptives will be reduced to 1 or less incidents per week, and the vineland maladaptive domain score is 17 or less. Behavior analyst and assistant will reduce services by 25%, for 3 consecutive months.',
  'Phase 2':
    'Phase 1 sustained and Progress on current skill acquisition goals at 80%, pluss vineland socialization and communication domain scores at 80 or above. Behavior analyst and assistant will reduce services by 50%, for 3 consecutive months',
  'Phase 3':
    'Phase 2 sustained, skills generalized/maintained 80%. Behavior analyst and assistant will reduce services by 75%, for 3 consecutive months.',
  'Phase 4':
    'Phase 3 sustained. Behavior analyst will provide 1 hr per week consultation only model to ensure generalization/maintenance of skills, for 3 consecutive months Assistant will be discontinued.',
  'Phase 5':
    'Phase 4 sustained. Behavior analyst will provide 1 hr per month consultation only model to ensure generalization/maintenance of skills, for 3 consecutive months.',
  'Phase 6': 'Phase 5 sustained. services will be discontinued',
};
export class TransitionFadingPlan {
  phase: PhaseOption;
  description: string;
  constructor(data: Partial<TransitionFadingPlan>) {
    Object.assign(this, data);
    this.phase = StringOrNullOrUndefined(data.phase) as PhaseOption;
    this.description = StringOrNullOrUndefined(data.description);
  }
  static getDefault(): TransitionFadingPlan {
    return {
      phase: null,
      description: '',
    };
  }
}

export const deafultDischargePlan = `The desired outcomes for discharge will be refined throughout the treatment process. Transition and discharge planning from a treatment program is included in this plan and specifies details of monitoring and follow-up as is appropriate for the client and the family. Parents, extended family members, community caregivers, and others involved professionals will be consulted as the planning process accelerates with 3-6 months prior to the discharge. A description of roles and responsibilities of all providers and effective dates for behavioral targets that must be achieved prior to discharge will be specified and coordinated with all providers, and family members. Discharge and transition planning will involve a gradual step down in services.
Discharge often requires 6 months or longer. Discharge Services will be reviewed and evaluated and discharge planning begun when:
• the client has achieved treatment goals (0 incidents of challenging behavior and performs correctly on skill acquisition goals); OR
• Family is interested in discontinuing services; OR
• Family and provider are not able to reconcile important issues in treatment planning and delivery
the client will be discharged when client has mastered all long-term goals being targeted and no additional skills areas and/or behavioral issues have been identified as a need for targeted treatment goals. Parents will also demonstrate understanding of ABA interventions and teaching/modeling for the client consistently without support from therapist.
`;

export class GeneralizationTraining {
  id: number;
  bip_id: number;
  //
  discharge_plan: string;
  transition_fading_plans: TransitionFadingPlan[];
  //
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  constructor(data: Partial<GeneralizationTraining>) {
    Object.assign(this, data);
    this.id = NumberOrNullOrUndefined(data.id);
    this.bip_id = NumberOrNullOrUndefined(data.bip_id);
    this.discharge_plan =
      StringOrNullOrUndefined(data.discharge_plan) ?? deafultDischargePlan;
    this.transition_fading_plans = ForceMap(
      data.transition_fading_plans,
      TransitionFadingPlan
    );
    this.created_at = DateOrNullOrUndefined(data.created_at);
    this.updated_at = DateOrNullOrUndefined(data.updated_at);
    this.deleted_at = DateOrNullOrUndefined(data.deleted_at);
  }
  static getDefault(): GeneralizationTraining {
    return {
      id: null,
      bip_id: null,
      discharge_plan: deafultDischargePlan,
      transition_fading_plans: [],
      created_at: undefined,
      updated_at: undefined,
      deleted_at: undefined,
    };
  }
}
