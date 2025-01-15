import {
  DateOrNullOrUndefined,
  ForceMap,
  NumberOrNullOrUndefined,
  StringOrNullOrUndefined,
} from 'src/app/shared/utils';
import { Objective } from './bip.v2.model';

export class PlanV2 {
  index?: number;
  id: number;
  bip_id: number;
  name: string;
  description: string;
  baseline_level: number;
  baseline_date: Date;
  end_date: Date;
  initial_intensity: number;
  current_intensity: number;
  category: 'maladaptive' | 'sustitution';
  status: 'active' | 'inactive';
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  objectives: Objective[];
  constructor(data: Partial<PlanV2>) {
    const self: PlanV2 = {
      ...data,
      id: NumberOrNullOrUndefined(data.id),
      bip_id: NumberOrNullOrUndefined(data.bip_id),
      name: StringOrNullOrUndefined(data.name),
      description: StringOrNullOrUndefined(data.description),
      baseline_level: NumberOrNullOrUndefined(data.baseline_level),
      baseline_date: DateOrNullOrUndefined(data.baseline_date),
      end_date: DateOrNullOrUndefined(data.end_date),
      initial_intensity: NumberOrNullOrUndefined(data.initial_intensity),
      current_intensity: NumberOrNullOrUndefined(data.current_intensity),
      category: StringOrNullOrUndefined(data.category) as 'maladaptive',
      status: StringOrNullOrUndefined(data.status) as 'active',
      objectives: ForceMap(data.objectives, Objective),
    };
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
      status: 'inactive',
      objectives: [],
    });
  }
}
