export interface NoteIntervention {
  token_economy: boolean;
    generalization: boolean;
    NCR: boolean;
    behavioral_momentum: boolean;
    DRA: boolean;
    DRI: boolean;
    DRO: boolean;
    DRL: boolean;
    response_block: boolean;
    errorless_teaching: boolean;
    extinction: boolean;
    chaining: boolean;
    natural_teaching: boolean;
    redirection: boolean;
    shaping: boolean;
    pairing: boolean;
}
export interface NoteIntervention2 {
  token_economy: boolean;
    generalization: boolean;
    NCR: boolean;
    behavioral_momentum: boolean;
    DRA: boolean;
    DRI: boolean;
    DRO: boolean;
    DRL: boolean;
    response_block: boolean;
    errorless_teaching: boolean;
    extinction: boolean;
    chaining: boolean;
    natural_teaching: boolean;
    redirection: boolean;
    shaping: boolean;
    pairing: boolean;
}
export interface NoteNewList {
    FAST: boolean;
    MAST: boolean;
    QABF: boolean;
    ABC_data_collection: boolean;
    VBmapp: boolean;
    Ablls: boolean;
    EFL: boolean;
    Peak: boolean;
    parent_interview: boolean;
    reinforcement_questionnaire: boolean;
    preference_assessment: boolean;
    other: boolean;

}
export interface NoteOutcomeList {
    SRS_2: boolean;
    vineland_3: boolean;
    PDDBI: boolean;
    PSI_4_short_form: boolean;

}
export interface NoteBehaviorsList {
  maladaptive_behavior: string;

}


//crear nota

export interface ValidationResult {
  isValid: boolean;
  missingFields: string[];
}
export interface Intervention {
  id: string;
  name: string;
  value: boolean;
}
export interface InterventionsDoble {
  id: string;
  name: string;
  value: boolean;
  value2: boolean;
}
export interface ReplacementL {
  id: string;
  name: string;
  value: boolean;
}
export interface ReplacementL2 {
  id: string;
  name: string;
  value: boolean;
  value2: boolean;
}
export interface Objetives1 {
  id: string;
  description: string;
  status: string;
  value: boolean;
}
export interface Objetives {
  id: string;
  description: string;
  status: string;
  value: boolean;
  value2: boolean;
}
export interface NewList {
  id: string;
  name: string;
  value: boolean;
}
export interface Outcome {
  id: string;
  name: string;
  value: boolean;
}
export interface show97151L {
  cpt: string;
}

export interface MaladaptiveProtocol {
  id: number;
  name: string;
  description?: string;
  value: boolean;
}

export interface MaladaptiveData {
  id: number;
  name: string;
  description?: string;
  status?: string;
  number_of_occurrences: number | null;
}

export interface ReplacementProtocol {
  id: number;
  name: string;
  description: string;
  status: string;
  assessed?: boolean;
  modified?: boolean;
  demonstrated?: boolean;
}


