export class Recomendation {
  id: number;
  de_escalation_technique_id: number;
  index?: number;
  cpt: string;
  num_units: number;
  breakdown_per_week: string;
  location: string;
  description_service: string;
  constructor(data: Partial<Recomendation>) {
    Object.assign(this, data);
  }
  static getDefault(): Recomendation {
    return {
      id: 0,
      de_escalation_technique_id: 0,
      index: undefined, // Changed from 0
      cpt: '',
      num_units: 0,
      breakdown_per_week: '',
      location: '',
      description_service: '',
    };
  }
}
