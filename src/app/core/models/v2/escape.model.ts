import { BIP_CONST } from './constants';

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
      preventive_strategies: BIP_CONST.ESCAPE.STRATEGY,
      replacement_skills: BIP_CONST.ESCAPE.REPLACEMENT_SKILLS,
      manager_strategies: BIP_CONST.ESCAPE.MANAGER_STRATEGY,
    });
  }
  static getDefaults(): Escape[] {
    return [this.getDefault()];
  }
}
