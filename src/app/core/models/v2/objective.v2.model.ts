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
  plan_id: number;
  type: ObjectiveType;
  status: ObjectiveStatus;
  name?: string;
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
      plan_id: NumberOrNullOrUndefined(data.plan_id),
      status:
        (StringOrNullOrUndefined(data.status) as ObjectiveStatus) ||
        'not started',
      type: StringOrNullOrUndefined(data.type) as ObjectiveType,
      initial_date: DateOrNullOrUndefined(data.initial_date),
      end_date: DateOrNullOrUndefined(data.end_date),
      name: StringOrNullOrUndefined(data.name),
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
      id: undefined,
      type: 'STO',
      plan_id: 0,
      status: 'not started',
      initial_date: new Date(),
      end_date: null,
      description: '',
      target: 0,
      start_point: 0,
      order: 0,
      index: undefined, // Changed from 0 to undefined
    });
  }
  static getDefaultCaregiverObjectives(): Objective[] {
    return [
      {
        id: 0,
        plan_id: 0,
        type: 'STO' as const,
        status: 'not started' as const,
        initial_date: new Date(),
        end_date: null,
        name: 'Caregiver demonstrate understanding of the 4 functions of behavior',
        description:
          'Monthly fidelity checks in which the percentage of times (across 4 data points) the parent demonstrated concept.',
        target: 0,
        start_point: 0,
        order: 0,
        index: 0,
      },

      {
        id: 0,
        plan_id: 0,
        type: 'STO' as const,
        status: 'not started' as const,
        initial_date: new Date(),
        end_date: null,
        name: `
Caregiver demonstrate
understanding of
Reinforcement
`,
        description: `
Monthly fidelity checks in which the
percentage of times (across 4 data
points) the parent demonstrated
concept.
`,

        target: 0,
        start_point: 0,
        order: 0,
        index: 0,
      },
      {
        id: 0,
        plan_id: 0,
        type: 'STO' as const,
        status: 'not started' as const,
        initial_date: new Date(),
        end_date: null,
        name: `
Caregiver demonstrate
understanding of extinction
`,
        description: `
Monthly fidelity checks in which the
percentage of times (across 4 data
points) the parent demonstrated
concept.
`,

        target: 0,
        start_point: 0,
        order: 0,
        index: 0,
      },
      {
        id: 0,
        plan_id: 0,
        type: 'STO' as const,
        status: 'not started' as const,
        initial_date: new Date(),
        end_date: null,
        name: `
Caregiver demonstrate
understanding of Differential
Reinforcement
`,
        description: `
Monthly fidelity checks in which the
percentage of times (across 4 data
points) the parent demonstrated
concept.

`,

        target: 0,
        start_point: 0,
        order: 0,
        index: 0,
      },
      {
        id: 0,
        plan_id: 0,
        type: 'STO' as const,
        status: 'not started' as const,
        initial_date: new Date(),
        end_date: null,
        name: `
Caregiver demonstrate
understanding of Motivating
operations
`,
        description: `
Monthly fidelity checks in which the
percentage of times (across 4 data
points) the parent demonstrated
concept.
`,
        target: 0,
        start_point: 0,
        order: 0,
        index: 0,
      },
      {
        id: 0,
        plan_id: 0,
        type: 'STO' as const,
        status: 'not started' as const,
        initial_date: new Date(),
        end_date: null,
        name: `
Caregiver demonstrate
understanding of Prompting
`,
        description: `
Monthly fidelity checks in which the
percentage of times (across 4 data
points) the parent demonstrated
concept.

`,

        target: 0,
        start_point: 0,
        order: 0,
        index: 0,
      },
      {
        id: 0,
        plan_id: 0,
        type: 'STO' as const,
        status: 'not started' as const,
        initial_date: new Date(),
        end_date: null,
        name: `
Caregiver demonstrate
understanding of fading
`,
        description: `
Monthly fidelity checks in which the
percentage of times (across 4 data
points) the parent demonstrated
concept.

`,

        target: 0,
        start_point: 0,
        order: 0,
        index: 0,
      },
      {
        id: 0,
        plan_id: 0,
        type: 'STO' as const,
        status: 'not started' as const,
        initial_date: new Date(),
        end_date: null,
        name: `
Caregiver demonstrate
understanding of shaping
`,
        description: `
Monthly fidelity checks in which the
percentage of times (across 4 data
points) the parent demonstrated
concept.

`,

        target: 0,
        start_point: 0,
        order: 0,
        index: 0,
      },
      {
        id: 0,
        plan_id: 0,
        type: 'STO' as const,
        status: 'not started' as const,
        initial_date: new Date(),
        end_date: null,
        name: `
Caregiver demonstrate
understanding of antecedents
`,
        description: `
Monthly fidelity checks in which the
percentage of times (across 4 data
points) the parent demonstrated
concept.
`,

        target: 0,
        start_point: 0,
        order: 0,
        index: 0,
      },
      {
        id: 0,
        plan_id: 0,
        type: 'STO' as const,
        status: 'not started' as const,
        initial_date: new Date(),
        end_date: null,
        name: `
Caregiver demonstrate
understanding of
consequences
`,
        description: `
Monthly fidelity checks in which the
percentage of times (across 4 data
points) the parent demonstrated
concept.
`,

        target: 0,
        start_point: 0,
        order: 0,
        index: 0,
      },
      {
        id: 0,
        plan_id: 0,
        type: 'STO' as const,
        status: 'not started' as const,
        initial_date: new Date(),
        end_date: null,
        name: `
Caregiver demonstrate
understanding of task
analysis
`,
        description: `
Monthly fidelity checks in which the
percentage of times (across 4 data
points) the parent demonstrated
concept.
`,

        target: 0,
        start_point: 0,
        order: 0,
        index: 0,
      },
      {
        id: 0,
        plan_id: 0,
        type: 'STO' as const,
        status: 'not started' as const,
        initial_date: new Date(),
        end_date: null,
        name: `
Caregiver demonstrate
understanding of chaining
`,
        description: `
Monthly fidelity checks in which the
percentage of times (across 4 data
points) the parent demonstrated
concept.
`,

        target: 0,
        start_point: 0,
        order: 0,
        index: 0,
      },
      {
        id: 0,
        plan_id: 0,
        type: 'STO' as const,
        status: 'not started' as const,
        initial_date: new Date(),
        end_date: null,
        name: `
Caregiver demonstrate
generalization of skills to
natural environment
`,
        description: `
Monthly fidelity checks in which the
percentage of times (across 4 data
points) the parent demonstrated concept.
      `,
        target: 0,
        start_point: 0,
        order: 0,
        index: 0,
      },
    ].map((_, index) => ({ ..._, index }));
  }
}
