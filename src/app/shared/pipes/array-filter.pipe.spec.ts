import { TestBed } from '@angular/core/testing';
import { ArrayFilterPipe } from './array-filter.pipe';

describe('Pipe: ArrayFilter', () => {
  let pipe: ArrayFilterPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArrayFilterPipe],
    });

    pipe = TestBed.inject(ArrayFilterPipe);
  });

  it('should filter array by specific field and value', () => {
    const items = [
      { id: 1, name: 'Tokio' },
      { id: 2, name: 'Nueva York' },
      { id: 3, name: 'Londres' },
      { id: 4, name: 'Paris' },
    ];

    expect(pipe.transform(items, 'id', 2)).toEqual([
      { id: 2, name: 'Nueva York' },
    ]);
    expect(pipe.transform(items, 'name', 'Paris')).toEqual([
      { id: 4, name: 'Paris' },
    ]);
  });

  it('should return original array if field or value is not provided', () => {
    const items = [
      { id: 1, name: 'Tokio' },
      { id: 2, name: 'Nueva York' },
    ];

    expect(pipe.transform(items, null, null)).toEqual(items);
    expect(pipe.transform(items, 'name', null)).toEqual(items);
  });
});
