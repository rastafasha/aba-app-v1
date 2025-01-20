export type ObjectiveStatus =
  | 'no started'
  | 'in progress'
  | 'mastered'
  | 'initiated'
  | 'on hold'
  | 'discontinued'
  | 'maintenance';
export const OBJECTIVE_STATUS_MAP: Record<ObjectiveStatus, string> = {
  'no started': 'Not Started',
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
  }
  static getDefault(): Objective {
    return new Objective({
      id: 0,
      type: 'STO',
      maladaptive_id: 0,
      status: 'no started',
      initial_date: new Date(),
      end_date: new Date(),
      description: '',
      target: 0,
      order: 0,
    });
  }
}
