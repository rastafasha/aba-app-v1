export interface Supervisor {
  name: string;
  surname: string;
  npi: string;
}

export interface Tecnico {
  name: string;
  surname: string;
  npi: string;
}

export interface Protocol {
  name: string;
  assessed?: boolean;
  modified?: boolean;
  demonstrated?: boolean;
}

export interface PlanProtocol extends Protocol {
  plan_id: number;
}

export interface DiscussedPlanProtocol {
  plan_id: number;
  name: string;
  discussed: boolean;
}

export interface CaregiverGoalProtocol {
  plan_id: number;
  name: string;
  percentage_achieved?: number;
}

export type AssessmentToolType = 'observation' | 'report';
