import {
  NumberOrNullOrUndefined,
  StringOrNullOrUndefined,
  ForceMap,
  DateOrNullOrUndefined,
} from 'src/app/shared/utils';

export class TransitionFadingPlan {
  phase: string;
  description: string;
  constructor(data: Partial<TransitionFadingPlan>) {
    Object.assign(this, data);
    this.phase = StringOrNullOrUndefined(data.phase);
    this.description = StringOrNullOrUndefined(data.description);
  }
  static getDefault(): TransitionFadingPlan {
    return {
      phase: '',
      description: '',
    };
  }
}

export class GeneralizationTraining {
  id: number;
  bip_id: number;
  patient_id: string;
  client_id: number;
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
    this.patient_id = StringOrNullOrUndefined(data.patient_id);
    this.client_id = NumberOrNullOrUndefined(data.client_id);
    this.discharge_plan = StringOrNullOrUndefined(data.discharge_plan);
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
      patient_id: null,
      client_id: null,
      discharge_plan: null,
      transition_fading_plans: [],
      created_at: undefined,
      updated_at: undefined,
      deleted_at: undefined,
    };
  }
}
