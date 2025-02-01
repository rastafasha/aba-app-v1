
export class Tangible {
  index?: number;
  preventive_strategies: string;
  replacement_skills: string;
  manager_strategies: string;
  constructor(data: Partial<Tangible>) {
    Object.assign(this, data);
  }
  static getDefault(): Tangible {
    return new Tangible({
      index: undefined, // Changed from 0
      preventive_strategies: '',
      replacement_skills: '',
      manager_strategies: '',
    });
  }
}
