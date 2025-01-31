export class Attention {
  index?: number;
  preventive_strategies: string;
  replacement_skills: string;
  manager_strategies: string;
  constructor(data: Partial<Attention>) {
    Object.assign(this, data);
  }
  static getDefault(): Attention {
    return new Attention({
      index: undefined, // Changed from 0
      preventive_strategies: '',
      replacement_skills: '',
      manager_strategies: '',
    });
  }
}
