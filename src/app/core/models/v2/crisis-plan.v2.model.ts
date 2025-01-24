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
      crisis_description: '',
      crisis_note: '',
      caregiver_requirements_for_prevention_of_crisis: '',
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
