export class Escape {
  index?: number;
  preventive_strategies: string;
  replacement_skills: string;
  manager_strategies: string;
  constructor(data: Partial<Escape>) {
    Object.assign(this, data);
  }
  static getDefault(): Escape {
    return new Escape({
      index: undefined, // Changed from 0
      preventive_strategies: '',
      replacement_skills: '',
      manager_strategies: '',
    });
  }
}
