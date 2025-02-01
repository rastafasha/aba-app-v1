export class PrevalentSettingEventAndAntecedent {
  index?: number;
  prevalent_setting_event_and_antecedent: string;
  behavior: string;
  hypothesized_functions: string;
  constructor(data: Partial<PrevalentSettingEventAndAntecedent>) {
    Object.assign(this, data);
  }
  static getDeafult(): PrevalentSettingEventAndAntecedent {
    return {
      index: undefined, // Changed from 0
      prevalent_setting_event_and_antecedent: '',
      behavior: '',
      hypothesized_functions: '',
    };
  }
}
