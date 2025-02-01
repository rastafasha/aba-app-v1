export class Recomendation {
  id: number;
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
      index: undefined, // Changed from 0
      cpt: '',
      num_units: 0,
      breakdown_per_week: '',
      location: '',
      description_service: '',
    };
  }
  static getDefaults(): Recomendation[] {
    return [
      {
        id: 0,
        index: undefined, // Changed from 0
        cpt: '97151',
        description_service: 'Assesment',
        num_units: 18,
        breakdown_per_week: '4.5 hours total',
        location: 'Home/School/Office',
      },
      {
        id: 0,
        index: undefined, // Changed from 0
        cpt: '97156',
        description_service: 'BCaBA (caregiver training) modifier HN',
        num_units: 208,
        breakdown_per_week: '2 hours per week',
        location: 'Home only',
      },
      {
        id: 0,
        index: undefined, // Changed from 0
        cpt: '97153',
        description_service: 'RBT 1:1 direct services',
        num_units: 3120,
        breakdown_per_week: '30 hours per week',
        location: 'Home/School',
      },
      {
        id: 0,
        index: undefined, // Changed from 0
        cpt: '97155',
        description_service: 'BCaBA (caregiver training) modifier HN',
        num_units: 208,
        breakdown_per_week: '2 hours per week',
        location: 'Home/School',
      },
      {
        id: 0,
        index: undefined, // Changed from 0
        cpt: '97155',
        description_service: 'BCBA (protocol modification)',
        num_units: 24,
        breakdown_per_week: '1 hours per month',
        location: 'Home/School',
      },
    ].map((_, index) => ({ ..._, index }));
  }
}
