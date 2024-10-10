import { TestBed } from '@angular/core/testing';

import { TransformToDatePipe } from './transform-to-date.pipe';

fdescribe('TransformToDatePipe', () => {
  let pipe: TransformToDatePipe;
  const time = '2345';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransformToDatePipe],
    });
  });

  beforeEach(() => {
    pipe = TestBed.inject(TransformToDatePipe);
  });

  it('debería transformar un tiempo en milisegundos a fecha', () => {
    expect(pipe.transformTimeToSeconds(time)).toEqual(8442000);
  });

  xit('debería transformar un tiempo HH:MM:SS a DD/MM/YYYY hh:mm:ss AM/PM', () => {
    const date = new Date();
    expect(pipe.transformHHMMSSToDateTime(time, date)).toEqual({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hours: String(date.getHours()).padStart(2, '0'),
      minutes: String(date.getMinutes()).padStart(2, '0'),
      seconds: String(date.getSeconds()).padStart(2, '0'),
    });
  });
});
