import {
  DateOrNullOrUndefined,
  ForceMap,
  NumberOrNullOrUndefined,
  StringOrNullOrUndefined,
} from 'src/app/shared/utils';
import { Objective } from './objective.v2.model';
import { PLAN_CONST } from './constants';
export type PlanStatus =
  | 'active'
  | 'completed'
  | 'hold'
  | 'discontinued'
  | 'maintenance'
  | 'met'
  | 'monitoring';
export const PLAN_STATUS_MAP: Record<PlanStatus, string> = {
  active: 'Active',
  completed: 'Completed',
  hold: 'On Hold',
  discontinued: 'Discontinued',
  maintenance: 'Maintenance',
  met: 'Met',
  monitoring: 'Monitoring',
};

export type PlanCategory =
  | 'maladaptive'
  | 'replacement'
  | 'caregiver_training'
  | 'rbt_training';

export const PLAN_CATEGORY_MAP: Record<PlanCategory, string> = {
  maladaptive: 'Maladaptive',
  replacement: 'Replacement',
  caregiver_training: 'Caregiver Training',
  rbt_training: 'RBT Training',
};

export class PlanV2 {
  //internal
  index?: number;
  id: number;
  bip_id: number;
  category: PlanCategory;
  //external
  name: string;
  status: PlanStatus;
  description: string;
  baseline_level: number;
  baseline_date: Date;
  initial_intensity: number;
  current_intensity: number;
  //
  objectives: Objective[];
  //other
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  constructor(data: Partial<PlanV2>) {
    const self: PlanV2 = {
      ...data,
      id: NumberOrNullOrUndefined(data.id),
      bip_id: NumberOrNullOrUndefined(data.bip_id),
      name: StringOrNullOrUndefined(data.name),
      description: StringOrNullOrUndefined(data.description),
      baseline_level: NumberOrNullOrUndefined(data.baseline_level),
      baseline_date: DateOrNullOrUndefined(data.baseline_date),
      initial_intensity: NumberOrNullOrUndefined(data.initial_intensity),
      current_intensity: NumberOrNullOrUndefined(data.current_intensity),
      category: StringOrNullOrUndefined(data.category) as 'maladaptive',
      status: StringOrNullOrUndefined(data.status) as 'active',
      objectives: ForceMap(data.objectives, Objective),
      created_at: DateOrNullOrUndefined(data.created_at),
      updated_at: DateOrNullOrUndefined(data.updated_at),
      deleted_at: DateOrNullOrUndefined(data.deleted_at),
    };
    //Extra Changes
    self.objectives = self.objectives.map((item, index) => ({
      ...item,
      index,
    }));
    return self;
  }

  static getDefault(): PlanV2 {
    return new PlanV2({
      id: 0,
      bip_id: 0,
      name: '',
      description: '',
      baseline_level: 0,
      baseline_date: new Date(),
      initial_intensity: 0,
      current_intensity: 0,
      category: 'maladaptive',
      status: 'active',
      objectives: [],
      index: undefined, // Changed from 0 to undefined
      created_at: undefined,
      updated_at: undefined,
      deleted_at: undefined,
    });
  }
  static getDefaultsCaregiverPlan(): PlanV2[] {
    return [
      {
        id: 0,
        bip_id: 0,
        name: 'Caregiver Training Plan',
        description: PLAN_CONST.CAREGIVER_PLAN,
        baseline_level: undefined,
        baseline_date: new Date(),
        initial_intensity: undefined,
        current_intensity: undefined,
        category: 'caregiver_training',
        status: 'active',
        objectives: Objective.getDefaultCaregiverObjectives(),
        index: undefined, // Changed from 0 to undefined
        created_at: undefined,
        updated_at: undefined,
        deleted_at: undefined,
      },
    ];
  }
}
