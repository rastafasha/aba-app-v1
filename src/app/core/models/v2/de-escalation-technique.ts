import { ForceMap } from 'src/app/shared/utils';
import { Recomendation } from './recomendation.model';

export class DeEscalationTechnique {
  id: number;
  bip_id: number;
  index?: number;
  description: string;
  service_recomendation: string;
  recomendation_lists: Recomendation[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  constructor(data: Partial<DeEscalationTechnique>) {
    Object.assign(this, data);
    this.recomendation_lists = ForceMap(
      data.recomendation_lists,
      Recomendation
    );
  }
  static getDefault(): DeEscalationTechnique {
    return {
      id: 0,
      bip_id: 0,
      description: '',
      service_recomendation: '',
      recomendation_lists: [],
    };
  }
}
