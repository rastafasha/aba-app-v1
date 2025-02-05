export type TypeOfAssessment = '1' | '2';
export const TYPE_OF_ASSESSMENT_MAP: Record<TypeOfAssessment, string> = {
  '1': 'Initial Assessment',
  '2': 'Reassessment',
};

export const PLAN_CONST = {
  HYPOTHESIS_BASED_INTERVENTION:
    'The following hypothesis-based interventions and instructional practices will be initiated to address the different patterns of behavior/response classes. These strategies have been selected because they are directly linked to the functions of the client’s behavior and they are the least intrusive and most effective options available that will work within the environments in which the client participates.',
  CAREGIVER_PLAN: `All training provided is in relevant context/routines to caregivers supporting the client once on-going treatment begins. During the visit, clinicians will teach and train the behavior plan to caregivers. The behavior analyst will describe, model, and/or prompt the use of the procedures, making sure that the interventions fit well within existing routines and are feasible.

The expectation is that the caregiver or school staff will initially be implementing the plan with the assistance and support of the behavior assistant. If necessary, behavioral staff will provide simplified versions of the behavior and teaching plans to facilitate implementation. The analyst will observe caregivers and provide feedback, gradually fading the assistance they provide.

Parent training will occur weekly by the BCBA, but modeling of appropriate interventions and procedures will occur daily by RBT/lead analyst, depending on who is providing the service. All implementation of fidelity procedures, data collection, and analyzing of data will occur under the direction and guidance of the lead analyst; revisions will occur as needed. Participation by the parents or caregivers is expected, and continued authorization for ABA services will take consideration of their participation in at least 85% of planned sessions.

Teaching Methods: To develop the acquisition skills and replacement behaviors, the behavioral intervention professionals and caregivers will task analyze complex skills, develop routine-specific instructional plans, and use appropriate chaining, shaping, and prompting methods. Specifically, these will include natural environment training, incidental or milieu teaching, peer-mediated instruction, and role play-based intervention.

Teaching plans will be developed for complex skills and will include the environments in which the instruction is taking place. These teaching plans will include the specific skills or skill sequences to be taught, environmental arrangements to promote skill use (e.g., social stories, videos, token boards, timers, visual schedules), and other specific instructional procedures. Routines and skills targeted for instruction will be prioritized by the caregivers, addressing the most essential areas first.

Caregivers will be taught a variety of behavior interventions throughout the session. This will allow parents to successfully work with the client and any of his problem behaviors when the behavior assistant and analyst are not present. Ongoing training and monitoring will continue to occur on a weekly basis to ensure proper implementation of the behavior program. Each month, clinicians will conduct competency checks of the caregivers to ensure proper program implementation.
  `,
  GENERALIZATION_TRAINING: `As Client makes progress on the goals identified in this plan, specific strategies will be used to promote generalization across people and settings to improve the durability of the behavioral outcomes. To enhance generalization, lead analyst/Behavior assistant will collaborate with caregivers as well as the primary care physician, if requested.

Specific strategies to facilitate generalization will include (training loosely or diversely, engaging support providers, using multiple exemplars, fading cues and prompts, variable reinforcement schedules, accessing natural and indiscriminate contingencies, and thinning schedules of reinforcement).

Once caregivers demonstrate proficiency in the implementation of procedures, they should start to consistently implement the Behavior plan with Analyst’s supervision. Program will be conducted during daily living activities.`,
  RISK_ASSESSMENT: `Implementation of this intervention plan could be affected by the following: not consistent implementation of behavior plan by program implementers (caregivers, therapists). In an effort to overcome these barriers, we will monitor caregivers/ staff to ensure that the implementation of the programs is occurring on consistent and appropriate basis. It is also important to avoid gaps in services to avoid disrupting progress or failing to acquire functional skills. In addition, maladaptive behaviors that put consumer at risk might escalate if treatment is withheld.

Client’s maladaptive behaviors can have negative social consequences as others may avoid interaction with the client. Client needs close monitoring and external regulation. Non-compliance, prevents client from engaging in the acquisition of new behaviors that would foster learning, instruction following, independence and habituation to rule-bound settings, which pose subsequent risks. Maladaptive behaviors reduce opportunities for learning new things and interacting with peers. Helping Client communicate their needs, understand instructions and demands and regulate impulsive behavior is imperative to successful functioning in home, school and community settings.

Caregivers are to be trained on possible effects of treatment modalities such as Extinction Burst. Common effects of this intervention are an increase in the frequency of the target response (extinction burst) and increase in aggression (extinction-induced aggression). If parents/caregivers are not adequately trained to understand the process, they usually think that treatment is not working and make efforts to stop these interventions.

Punishment procedures are not used in this program and least restrictive strategies are always encouraged first. In the case that Response Cost or Simple Corrections are used, procedures will be described and all people involved in treatment will learn and demonstrate how to use them and what the contingencies will be.`,
  FADING_PLAN: `Phase 1: All maladaptives will be reduced to 1 or less incidents per week, and the vineland maladaptive domain score is 17 or less. Behavior analyst and assistant will reduce services by 25%, for 3 consecutive months.
Phase 2: Phase 1 sustained and Progress on current skill acquisition goals at 80%, plus vineland socialization and communication domain scores at 80 or above. Behavior analyst and assistant will reduce services by 50%, for 3 consecutive months
Phase 3: Phase 2 sustained, skills generalized/maintained 80%. Behavior analyst and assistant will reduce services by 75%, for 3 consecutive months.
Phase 4: Phase 3 sustained. Behavior analyst will provide 1 hr per week consultation only model to ensure generalization/maintenance of skills, for 3 consecutive months Assistant will be discontinued.
Phase 5: Phase 4 sustained. Behavior analyst will provide 1 hr per month consultation only model to ensure generalization/maintenance of skills, for 3 consecutive months.
Phase 6: Phase 5 sustained. services will be discontinued`,
  DISCHARGE_PLAN: `The desired outcomes for discharge will be refined throughout the treatment process. Transition and discharge planning from a treatment program is included in this plan and specifies details of monitoring and follow-up as is appropriate for the client and the family. Parents, extended family members, community caregivers, and others involved professionals will be consulted as the planning process accelerates with 3-6 months prior to the discharge. A description of roles and responsibilities of all providers and effective dates for behavioral targets that must be achieved prior to discharge will be specified and coordinated with all providers, and family members. Discharge and transition planning will involve a gradual step down in services.
Discharge often requires 6 months or longer. Discharge Services will be reviewed and evaluated and discharge planning begun when:
• the client has achieved treatment goals (0 incidents of challenging behavior and performs correctly on skill acquisition goals); OR
• Family is interested in discontinuing services; OR
• Family and provider are not able to reconcile important issues in treatment planning and delivery
the client will be discharged when client has mastered all long-term goals being targeted and no additional skills areas and/or behavioral issues have been identified as a need for targeted treatment goals. Parents will also demonstrate understanding of ABA interventions and teaching/modeling for the client consistently without support from therapist.
`,
  SERVICE_RECOMMENDATION_ADVICE: `ABA services will be focused on reducing the gap between the member’s chronological and developmental ages such that the member is able to develop or restore function to the maximum extent practical.`,
  CONSENT: `I hereby provide my consent to implement the behavior analysis service plan for the client. I agree that implementation of this behavior analysis service plan will involve the participation of the following professionals: RBT, Lead Analyst/BCBA, and caregivers, incorporating and training any other therapists or service providers involved in the client’s progress.

The particular interventions included in this behavior plan include modifications to the client’s surroundings and social conditions to reduce the likelihood of the challenging behavior and improve the client’s independence, systematic instruction to shape and strengthen adaptive skills, and strategies to manage the consequences of behavior so that reinforcement is maximized for positive behavior and withheld or minimized for problem behavior. Specific strategies are listed in the plan above.

I have had an opportunity to review the complete behavior plan verbally and in written form and get clarification in response to any questions I have. I agree to implement and/or support the implementation of this behavior intervention plan, participating in training and monitoring to promote its success. I have been made aware of potential risks (including the possibility that the client’s behavior may escalate before improving and/or vary across settings based on how the plan is implemented) and the anticipated benefits of intervention. I understand that these procedures can only be implemented as written with my approval. I reserve the right to refuse or discontinue consent to the plan or specific intervention practices at any point without repercussions or a lapse in services. If I withdraw consent, interventions will be discontinued immediately. I recognize the importance of fidelity and consistency, and therefore agree to make every effort to implement the plan as designed. Rights and responsibilities were clearly explained to me.
`,
};

export const BIP_CONST = {
  TANGIBLE: {
    STRATEGY: `Anticipate transitions and inform the client about what will happen next, allowing time to prepare and adjust.
Use a timer to signal the end of one activity and the beginning of another.
When possible, start activities only when there is enough time to complete them.
Communicate when activities will be available again, such as by using a picture schedule.
Encourage the client to engage in another activity while waiting.
Provide reminders of upcoming positive activities using “if-then” statements.
Keep highly preferred but unavailable items out of sight, out of reach, or remove them from the environment altogether.
`,
    REPLACEMENT_SKILLS: `Delay of Reinforcement (wait for tangibles)

Accepting denied access to tangible.

Requesting
`,
    MANAGER_STRATEGY: `Positive Behaviors:
If the client waits appropriately for desired items or activities, provide praise and grant access to the tangible once the designated waiting time has passed.
Maladaptive Behaviors:
If the client engages in problem behavior to gain access to tangibles, do not provide access to the item. Once the client is calm for three seconds, redirect them to use an appropriate request or wait for the tangible.
If the client engages in challenging behaviors, block the behavior (for less than 15 seconds) and do not allow access to the item. Once the client is calm for three seconds, redirect them to use an appropriate request or wait for the tangible.

`,
  },
  ATTENTION: {
    STRATEGY: `Time-contingent attention will be provided to the client every 10 minutes while at home.
At the end of each 10-minute interval, the caregiver should approach the client and provide attention by engaging in a brief conversation.
Clearly communicate when attention will be available and unavailable by, for example, informing the client before starting a phone call and explaining that attention will be available immediately afterward.
Remind the client to request attention using appropriate behaviors.
`,
    REPLACEMENT_SKILLS: `Teach client to gain other’s attention appropriately`,
    MANAGER_STRATEGY: `Positive Behaviors:
Provide immediate attention whenever possible when the client appropriately requests attention.
If immediate attention is not possible, inform the client of when you will be available.
Reward extended periods of independent activity with special, attention-rich interactions, such as playing a game together.
Maladaptive Behaviors:
Withhold or minimize attention for challenging behaviors by limiting conversation, avoiding eye contact, and blocking any harmful actions as needed.
If necessary, remove either yourself or the client from the situation to prevent interaction and escalation.
If the client engages in challenging behaviors, block the behavior (for less than 15 seconds) and redirect them to request attention appropriately.
`,
  },
  ESCAPE: {
    STRATEGY: `Simplify and clarify tasks, activities, or demands.
Incorporate preferred items (e.g., toys, edibles) into difficult or unpleasant tasks.
Use “if-then” statements to remind the client of enjoyable activities following task completion.
Start with easier tasks to build behavioral momentum.
Clearly differentiate choices from directives.
Avoid giving demands in noisy environments.
Remind the client when they can say no, request breaks, or ask for help.
Change working materials and environments periodically to prevent escape behaviors due to satiation.
Teach the client to create a plan for completing activities, allowing brief breaks and structuring tasks for manageability
`,
    REPLACEMENT_SKILLS: `Teach the client to request a break
Teach the client to ask for assistance
Increase the client’s time spent on tasks gradually.
Teach the client to accept transitions to non-preferred tasks.
`,
    MANAGER_STRATEGY: `Positive Behaviors:
If the client says no and the task, activity, or demand is optional (e.g., playing a game), respect their decision.
If the client requests a break, allow them to exit the activity for up to five minutes in a neutral setting (e.g., sitting on the sofa).
If the client asks for assistance, provide appropriate help.
If the client follows instructions at the expected percentage of trials (per replacement behavior goals), immediately provide praise and offer a break if needed.
If the client remains on task, provide praise and remind them that a break will be available after a set period, based on their current objective.
Maladaptive Behaviors:
If the client engages in challenging behaviors, do not allow them to leave the task until at least part of it is completed.
Withhold access to enjoyable activities until the task, activity, or demand has been completed.
If the client engages in challenging behaviors, block the behavior (for less than 15 seconds) and redirect them to complete part of the task or appropriately request a break.
`,
  },
  SENSORY: {
    STRATEGY: `Modify the Environment – Adjust lighting, noise levels, seating arrangements, or other environmental factors to reduce triggers that may contribute to the behavior.


Provide Predictable Routines – Establish structured daily schedules to help the client stay engaged and reduce the likelihood of maladaptive behaviors occurring in unstructured time.


Offer Alternative Activities – Embed engaging tasks (e.g., fine motor tasks, arts and crafts, object manipulation) into routines to provide ongoing engagement.


Schedule Breaks – Plan regular breaks throughout the day to provide structured opportunities for movement or other preferred activities.


Increase Active Engagement – Ensure the client is consistently engaged in meaningful, interactive tasks to minimize opportunities for maladaptive behaviors.


Introduce Visual Supports – Use visual schedules, timers, or first-then boards to signal transitions and expectations, reducing uncertainty and increasing focus.


Incorporate Movement-Based Activities – Provide structured movement opportunities (e.g., stretching, walking, physical play) to channel energy into functional tasks.


Adjust Task Demands – Modify task difficulty and presentation to maintain motivation and prevent disengagement that may lead to  maladaptive behaviors.


Use Clear and Concise Instructions – Provide simple, direct, and consistent instructions to ensure understanding and reduce confusion.


Embed Preferred Elements into Tasks – Incorporate items or activities the client enjoys into less preferred tasks to promote engagement and reduce maladaptive behaviors.


`,
    REPLACEMENT_SKILLS: `Engage in functional activities that provide similar input, such as manipulating objects, textured materials, or using tools designed for hands-on engagement.


Use appropriate movement-based actions, such as hand exercises, squeezing an object, or engaging in controlled physical activities that serve a similar function.


Learn to initiate structured engagement in activities that naturally provide the needed input, such as interactive play, specific vocational tasks, or guided movement activities.


`,
    MANAGER_STRATEGY: `Provide immediate reinforcement when the client engages in alternative behaviors that serve the same purpose, such as engaging in structured tasks or appropriate movement-based activities.


Reinforce engagement in meaningful activities by offering access to preferred tasks, praise, or other motivating reinforcers.


Use differential reinforcement by reinforcing periods where the behavior does not occur or when the client engages in more appropriate behaviors.



Use response blocking only when necessary to prevent harm, while ensuring the client is redirected to an appropriate alternative activity.


Limit access to items or conditions that may contribute to the behavior, and provide structured engagement to redirect focus.


Introduce delayed access to highly preferred activities if the behavior occurs, ensuring reinforcement is only provided following appropriate behavior.


Reinforce engagement in activities that are physically incompatible with the behavior, such as using hands for tasks instead of engaging in repetitive movements.


Redirect the client to functional engagement when the behavior occurs, guiding them to participate in an alternative task or activity.


Adjust task demands as needed, providing manageable and structured activities to prevent disengagement that may lead to maladaptive behaviors.





`,
  },
};
