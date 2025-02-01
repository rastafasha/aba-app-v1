export class Sensory {
  index?: number;
  preventive_strategies: string;
  replacement_skills: string;
  manager_strategies: string;
  constructor(data: Partial<Sensory>) {
    Object.assign(this, data);
  }
  static getDefault(): Sensory {
    return new Sensory({
      index: undefined, // Changed from 0
      preventive_strategies: '',
      replacement_skills: '',
      manager_strategies: '',
    });
  }
}
