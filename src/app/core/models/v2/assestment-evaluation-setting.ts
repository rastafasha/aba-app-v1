export class AssestmentEvaluationSetting {
  index?: number;
  tangible: string;
  activities: string;
  other: string;
  constructor(data: Partial<AssestmentEvaluationSetting>) {
    Object.assign(this, data);
  }
  static getDefault() {
    return new AssestmentEvaluationSetting({
      index: undefined, // Changed from 0
      tangible: '',
      activities: '',
      other: '',
    });
  }
}
