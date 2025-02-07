import { BIP_CONST } from './constants';

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
      preventive_strategies: BIP_CONST.ATTENTION.STRATEGY,
      replacement_skills: BIP_CONST.ATTENTION.REPLACEMENT_SKILLS,
      manager_strategies: BIP_CONST.ATTENTION.MANAGER_STRATEGY,
    });
  }
  static getDefaults(): Attention[] {
    return [this.getDefault()];
  }
}
