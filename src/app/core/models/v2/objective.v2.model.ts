import {
  DateOrNullOrUndefined,
  NumberOrNullOrUndefined,
  StringOrNullOrUndefined,
} from 'src/app/shared/utils';

export type ObjectiveStatus =
  | 'not started'
  | 'in progress'
  | 'mastered'
  | 'initiated'
  | 'on hold'
  | 'discontinued'
  | 'maintenance';
export const OBJECTIVE_STATUS_MAP: Record<ObjectiveStatus, string> = {
  'not started': 'Not Started',
  'in progress': 'In Progress',
  mastered: 'Mastered',
  initiated: 'Initiated',
  'on hold': 'On Hold',
  discontinued: 'Discontinued',
  maintenance: 'Maintenance',
};
export type ObjectiveType = 'STO' | 'LTO';
export class Objective {
  id: number;
  maladaptive_id: number;
  type: ObjectiveType;
  status: ObjectiveStatus;
  description: string;
  start_point: number;
  target: number;
  initial_date: Date;
  end_date: Date;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  order?: number;
  index?: number;
  constructor(data: Partial<Objective>) {
    Object.assign(this, data);
    const self: Objective = {
      ...data,
      id: NumberOrNullOrUndefined(data.id),
      maladaptive_id: NumberOrNullOrUndefined(data.maladaptive_id),
      status:
        (StringOrNullOrUndefined(data.status) as ObjectiveStatus) ||
        'not started',
      type: StringOrNullOrUndefined(data.type) as ObjectiveType,
      initial_date: DateOrNullOrUndefined(data.initial_date),
      end_date: DateOrNullOrUndefined(data.end_date),
      description: StringOrNullOrUndefined(data.description),
      target: NumberOrNullOrUndefined(data.target),
      start_point: NumberOrNullOrUndefined(data.start_point),
      order: NumberOrNullOrUndefined(data.order),
      index: NumberOrNullOrUndefined(data.index),
      created_at: data.created_at ? new Date(data.created_at) : null,
      updated_at: data.updated_at ? new Date(data.updated_at) : null,
      deleted_at: data.deleted_at ? new Date(data.deleted_at) : null,
    };
    return self;
  }
  static getDefault(): Objective {
    return new Objective({
      id: 0,
      type: 'STO',
      maladaptive_id: 0,
      status: 'not started',
      initial_date: new Date(),
      end_date: null,
      description: '',
      target: 0,
      start_point: 0,
      order: 0,
    });
  }
}
