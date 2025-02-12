import { DateOrNullOrUndefined } from 'src/app/shared/utils';

export class Intervention {
  index?: number;
  title: string;
  description: string;
  added_date: Date;
  constructor(data: Partial<Intervention>) {
    Object.assign(this, data);
    this.added_date ??= DateOrNullOrUndefined(this.added_date) ?? new Date();
  }
  static getDefault(): Intervention {
    return {
      index: undefined,
      title: '',
      description: '',
      added_date: new Date(),
    };
  }
  static getDefaults(): Intervention[] {
    return [
      {
        index: 1,
        title: 'Differential Reinforcement of Alternative Behaviors',
        description:
          'Differential reinforcement of alternative behaviors will involve delivery of reinforcement each time the alternative behavior occurs while extinguishing problem behavior. Initially, reinforcement (praise, small edibles, access to tangibles) will be provided on a continuous schedule and then thinned to an intermittent schedule.',
        added_date: new Date(),
      },
      {
        index: 2,
        title: 'Redirection',
        description:
          'This will be used to redirect the consumer to alternative activities when she engages in elopement, Physical aggression, etc. Redirection will be used either during precursor behaviors or after a period of no maladaptives if a maladaptive behavior has occurred.',
        added_date: new Date(),
      },
      {
        index: 3,
        title: 'Response Block',
        description:
          'When Client attempts to engage in aggression, elopement, caregiver will use response block to prevent it, while minimizing eye contact and talking. The response block should not last for more than 15 seconds. This technique does not involve restraint. Problem behavior responses are blocked without grabbing the individual. The parent and behavior analyst will block by placing their arm or open hand between Client and the area being targeted.',
        added_date: new Date(),
      },
      {
        index: 4,
        title: 'Premack Principle',
        description:
          'Client will engage in high-probability behavior, contingent upon completing programming, or chores (less probability behavior). Restricting the high-probability activity to below baseline rates will increase its reinforcing efficacy. To ensure that the high-probability activity will function as a reinforcer, this activity will only be available contingent upon the completion of the low-probability activity.',
        added_date: new Date(),
      },
      {
        index: 5,
        title: 'Shaping',
        description:
          'Will be used to build target behaviors that do not yet exist such as waiting for tangibles, requesting tangibles, sharing/taking turns, interacting with peers, etc. Approximations to the target behavior will be consistently reinforced.',
        added_date: new Date(),
      },
      {
        index: 6,
        title: 'Escape Extinction',
        description:
          'As some of her behaviors are reinforced by escape from demands, extinction will be utilized to eliminate escape after the mentioned maladaptive behaviors. Client will be given a direction to complete a task, if maladaptive behaviors occur, then physical guidance (gently placing hand on her back and or hand over hand) will be used so that Client will not be able to escape from the demand or task. Regardless of how long Client engages in these behaviors caregivers will continue to present the demand and use physical guidance for two minutes maximum to prevent escape. Praise will be provided as Client completes each step of the task and a tangible when she completes all the steps. Escape independent response delivery',
        added_date: new Date(),
      },
    ];
  }
}
