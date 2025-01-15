import {
  DateOrNullOrUndefined,
  ForceMap,
  NumberOrNullOrUndefined,
  StringOrNullOrUndefined,
} from 'src/app/shared/utils';
import { Objective } from './bip.v2.model';


export class Caregiver {
  index: number;
  nombre: string;
  criteria: string;
  initiation: Date;
  caregiver_goal: string;
  current_status: string;
  outcome_measure: string;
  constructor(data: Partial<Caregiver>) {
    this.nombre = StringOrNullOrUndefined(data.nombre);
    this.criteria = StringOrNullOrUndefined(data.criteria);
    this.criteria = StringOrNullOrUndefined(data.criteria);
    this.initiation = DateOrNullOrUndefined(data.initiation);
    this.caregiver_goal = StringOrNullOrUndefined(data.caregiver_goal);
    this.current_status = StringOrNullOrUndefined(data.current_status);
    this.outcome_measure = StringOrNullOrUndefined(data.outcome_measure);
  }
}
export class GoalV2 {
  index?: number;
  id: number;
  bip_id: number;
  name: string;
  description: string;
  baseline_level: number;
  baseline_date: Date;
  end_date?: Date;
  initial_intensity: number;
  current_intensity: number;
  category: 'maladaptive' | 'sustitution';
  status: 'active' | 'inactive';
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  objectives: Objective[];
  caregivers_training_goals?: Caregiver[];
  constructor(data: Partial<GoalV2>) {
    const self: GoalV2 = {
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
    };
    return self;
  }

  

  static getDefault(): GoalV2 {
    return new GoalV2({
      id: 0,
      bip_id: 0,
      name: '',
      description: '',
      baseline_level: 0,
      baseline_date: new Date(),
      initial_intensity: 0,
      current_intensity: 0,
      category: 'maladaptive',
      status: 'inactive',
      objectives: [],
    });
  }

  
}
