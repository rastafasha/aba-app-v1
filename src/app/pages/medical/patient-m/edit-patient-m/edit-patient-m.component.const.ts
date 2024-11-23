import { KeyValue } from '@angular/common';

export const DEFAULT_AVATAR = 'assets/img/user-06.jpg';

export const INTAKEN_OPTIONS: KeyValue<string, string>[] = [
  { value: 'waiting', key: 'Waiting' },
  { value: 'requested', key: 'Requested' },
  { value: 'reviewing', key: 'Reviewing' },
  { value: 'psycho eval', key: 'Psycho Eval' },
  { value: 'need new', key: 'Need New' },
  { value: '2 insurance', key: '2 insurance' },
  { value: 'yes', key: 'Yes' },
  { value: 'no', key: 'No' },
];
