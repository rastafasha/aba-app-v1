import { BIP_CONST } from './constants';

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
      preventive_strategies: BIP_CONST.SENSORY.STRATEGY,
      replacement_skills: BIP_CONST.SENSORY.REPLACEMENT_SKILLS,
      manager_strategies: BIP_CONST.SENSORY.MANAGER_STRATEGY,
    });
  }
  static getDefaults(): Sensory[] {
    return [this.getDefault()];
  }
}
