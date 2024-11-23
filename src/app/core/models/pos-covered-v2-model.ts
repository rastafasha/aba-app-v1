import {
  NumberOrNullOrUndefined,
  StringOrNullOrUndefined,
} from 'src/app/shared/utils';

export class PosCoveredV2 {
  id: number;
  code: string;
  name: string;

  constructor(data: Partial<PosCoveredV2>) {
    if (!data) return null;
    const result: PosCoveredV2 = {
      ...data,
      id: NumberOrNullOrUndefined(data.id),
      code: StringOrNullOrUndefined(data.code),
      name: StringOrNullOrUndefined(data.name),
    };
    return result;
  }
}
