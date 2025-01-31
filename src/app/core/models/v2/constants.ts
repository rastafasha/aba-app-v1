export type TypeOfAssessment = '1' | '2';

export const PLAN_CONST: {
  TYPE_OF_ASSESSMENT_MAP: Record<TypeOfAssessment, string>;
  HYPOTHESIS_BASED_INTERVENTION: string;
  CAREGIVER_PLAN: string;
} = {
  TYPE_OF_ASSESSMENT_MAP: {
    '1': 'Initial Assessment',
    '2': 'Reassessment',
  },
  HYPOTHESIS_BASED_INTERVENTION:
    'The following hypothesis-based interventions and instructional practices will be initiated to address the different patterns of behavior/response classes. These strategies have been selected because they are directly linked to the functions of the client’s behavior and they are the least intrusive and most effective options available that will work within the environments in which the client participates.',
  CAREGIVER_PLAN: `All training provided is in relevant context/routines to caregivers supporting the client once on-going treatment begins. During the visit, clinicians will teach and train the behavior plan to caregivers. The behavior analyst will describe, model, and/or prompt the use of the procedures, making sure that the interventions fit well within existing routines and are feasible.

The expectation is that the caregiver or school staff will initially be implementing the plan with the assistance and support of the behavior assistant. If necessary, behavioral staff will provide simplified versions of the behavior and teaching plans to facilitate implementation. The analyst will observe caregivers and provide feedback, gradually fading the assistance they provide.

Parent training will occur weekly by the BCBA, but modeling of appropriate interventions and procedures will occur daily by RBT/lead analyst, depending on who is providing the service. All implementation of fidelity procedures, data collection, and analyzing of data will occur under the direction and guidance of the lead analyst; revisions will occur as needed. Participation by the parents or caregivers is expected, and continued authorization for ABA services will take consideration of their participation in at least 85% of planned sessions.

Teaching Methods: To develop the acquisition skills and replacement behaviors, the behavioral intervention professionals and caregivers will task analyze complex skills, develop routine-specific instructional plans, and use appropriate chaining, shaping, and prompting methods. Specifically, these will include natural environment training, incidental or milieu teaching, peer-mediated instruction, and role play-based intervention.

Teaching plans will be developed for complex skills and will include the environments in which the instruction is taking place. These teaching plans will include the specific skills or skill sequences to be taught, environmental arrangements to promote skill use (e.g., social stories, videos, token boards, timers, visual schedules), and other specific instructional procedures. Routines and skills targeted for instruction will be prioritized by the caregivers, addressing the most essential areas first.

Caregivers will be taught a variety of behavior interventions throughout the session. This will allow parents to successfully work with the client and any of his problem behaviors when the behavior assistant and analyst are not present. Ongoing training and monitoring will continue to occur on a weekly basis to ensure proper implementation of the behavior program. Each month, clinicians will conduct competency checks of the caregivers to ensure proper program implementation.
  `,
};
