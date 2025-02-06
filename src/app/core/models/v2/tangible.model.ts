import { BIP_CONST } from './constants';

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
      preventive_strategies: BIP_CONST.TANGIBLE.STRATEGY,
      replacement_skills: BIP_CONST.TANGIBLE.REPLACEMENT_SKILLS,
      manager_strategies: BIP_CONST.TANGIBLE.MANAGER_STRATEGY,
    });
  }
  static getDefaults(): Tangible[] {
    return [Tangible.getDefault()];
  }
}
