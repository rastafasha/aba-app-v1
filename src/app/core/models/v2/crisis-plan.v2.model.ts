export const DEFAULT_CRISIS_PLAN = `The client does not display behaviors that require Crisis Management. However, Analyst and Assistant are trained in response blocking techniques (15 sec) and redirections should be implemented if recipient engages in intense behavior. If recipient engages in behavior that poses an immediate and continuing risk to themself or the people around them, the crisis will be managed using the least intrusive and safest strategies to curtail the behavior. If recipient engages in an activity that threatens harm, or if any novel problem behaviors of concern surfaces, the behavior may be safely managed by removing the client from danger and blocking them from aggressing toward others using response blocking (15 sec). Also by removing all throw-able items from recipient’s vicinity and/or moving them to an area where they cannot damage property or hurt others while engaging in the activity. If, during one of these episodes, recipient becomes injured, appropriate medical attention should be sought. If the client cannot be managed safely, caregivers are encouraged to call 911 immediately and report the incident to the behavior analyst, who will return your call within 24 hours.`;
export const DEFAULT_CRISIS_PLAN_PREVENTION = `Caregiver Requirements for Prevention of Crisis:
• Caregiver needs to have a clear understanding of the goals and objectives detailed in the behavior plan.
• Caregiver needs to have a clear understanding of the the client’s target maladaptive behavior, the precursors to the target behavior, the triggers which cause escalation and a general understanding of de-escalation techniques.
• Caregivers should have with them contact details of people that can be involved in the de-escalation process. Names and Phone Numbers clearly available, preferably written down physically and digitally (cell phone). Emergency information cards with the crisis plan and important information about your child can be posted in your home for caregivers, therapists, and first responders.
• Understanding of communication techniques which prevent a miscommunication and project calm toward the person in crisis.
• Understanding of the phases of escalation and have an ability to follow through on steps to prevent escalation during appropriate moments (when triggers are unpreventable for example).
• Understand the signs leading up to behavior that is harmful or dangerous to the client or others.
• Understand the goals of de-escalation.
• Caregivers (parents, family members) should be taught crisis management techniques by the Lead Analyst and have an understanding of basic crisis management.
`;
export class CrisisPlanV2 {
  id: number;
  bip_id: number;
  client_id: number;
  crisis_description: string;
  crisis_note: string;
  caregiver_requirements_for_prevention_of_crisis: string;
  risk_factors: RiskFactor;
  suicidalities: Suicidality;
  homicidalities: Homicidality;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  constructor(data: Partial<CrisisPlanV2>) {
    Object.assign(this, data);
    this.risk_factors = new RiskFactor(data.risk_factors);
    this.suicidalities = new Suicidality(data.suicidalities);
    this.homicidalities = new Homicidality(data.homicidalities);
  }
  static getDefault(): CrisisPlanV2 {
    return {
      id: 0,
      bip_id: 0,
      client_id: 0,
      crisis_description: DEFAULT_CRISIS_PLAN,
      crisis_note: '',
      caregiver_requirements_for_prevention_of_crisis:
        DEFAULT_CRISIS_PLAN_PREVENTION,
      risk_factors: RiskFactor.getDefault(),
      suicidalities: Suicidality.getDefault(),
      homicidalities: Homicidality.getDefault(),
    };
  }
}

export class RiskFactor {
  do_not_apply: boolean;
  elopement: boolean;
  assaultive_behavior: boolean;
  aggression: boolean;
  self_injurious_behavior: boolean;
  sexually_offending_behavior: boolean;
  fire_setting: boolean;
  current_substance_abuse: boolean;
  impulsive_behavior: boolean;
  psychotic_symptoms: boolean;
  self_mutilation_cutting: boolean;
  caring_for_ill_family_recipient: boolean;
  current_family_violence: boolean;
  dealing_with_significant: boolean;
  prior_psychiatric_inpatient_admission: boolean;
  other: string;
  constructor(data: Partial<RiskFactor>) {
    Object.assign(this, data);
    this.do_not_apply = !!data.do_not_apply;
    this.elopement = !!data.elopement;
    this.assaultive_behavior = !!data.assaultive_behavior;
    this.aggression = !!data.aggression;
    this.self_injurious_behavior = !!data.self_injurious_behavior;
    this.sexually_offending_behavior = !!data.sexually_offending_behavior;
    this.fire_setting = !!data.fire_setting;
    this.current_substance_abuse = !!data.current_substance_abuse;
    this.impulsive_behavior = !!data.impulsive_behavior;
    this.psychotic_symptoms = !!data.psychotic_symptoms;
    this.self_mutilation_cutting = !!data.self_mutilation_cutting;
    this.caring_for_ill_family_recipient =
      !!data.caring_for_ill_family_recipient;
    this.current_family_violence = !!data.current_family_violence;
    this.dealing_with_significant = !!data.dealing_with_significant;
    this.prior_psychiatric_inpatient_admission =
      !!data.prior_psychiatric_inpatient_admission;
  }
  static getDefault(): RiskFactor {
    return {
      do_not_apply: false,
      elopement: false,
      assaultive_behavior: false,
      aggression: false,
      self_injurious_behavior: false,
      sexually_offending_behavior: false,
      fire_setting: false,
      current_substance_abuse: false,
      impulsive_behavior: false,
      psychotic_symptoms: false,
      self_mutilation_cutting: false,
      caring_for_ill_family_recipient: false,
      current_family_violence: false,
      dealing_with_significant: false,
      prior_psychiatric_inpatient_admission: false,
      other: '',
    };
  }
}

export class Suicidality {
  not_present: boolean;
  ideation: boolean;
  plan: boolean;
  means: boolean;
  prior_attempt: boolean;
  constructor(data: Partial<Suicidality>) {
    Object.assign(this, data);
    this.not_present = !!data.not_present;
    this.ideation = !!data.ideation;
    this.plan = !!data.plan;
    this.means = !!data.means;
    this.prior_attempt = !!data.prior_attempt;
  }
  static getDefault(): Suicidality {
    return {
      not_present: false,
      ideation: false,
      plan: false,
      means: false,
      prior_attempt: false,
    };
  }
}

export class Homicidality {
  not_present: boolean;
  ideation: boolean;
  plan: boolean;
  means: boolean;
  prior_attempt: boolean;
  constructor(data: Partial<Homicidality>) {
    Object.assign(this, data);
    this.not_present = !!data.not_present;
    this.ideation = !!data.ideation;
    this.plan = !!data.plan;
    this.means = !!data.means;
    this.prior_attempt = !!data.prior_attempt;
  }
  static getDefault(): Homicidality {
    return {
      not_present: false,
      ideation: false,
      plan: false,
      means: false,
      prior_attempt: false,
    };
  }
}
