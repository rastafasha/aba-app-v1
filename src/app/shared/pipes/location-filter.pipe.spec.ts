import { TestBed } from '@angular/core/testing';
import { LocationFilterPipe } from './location-filter.pipe';

fdescribe('Pipe: LocationFilter', () => {
  let pipe: LocationFilterPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationFilterPipe],
    });

    pipe = TestBed.inject(LocationFilterPipe);
  });

  it('should filter locations by location_id', () => {
    const locations = [
      { id: 1, name: 'Tokio' },
      { id: 2, name: 'Nueva York' },
      { id: 3, name: 'Londres' },
      { id: 4, name: 'Paris' },
    ];

    const filter1 = { location_id: 1 };
    expect(pipe.transform(locations, filter1)).toEqual([
      { id: 1, name: 'Tokio' },
    ]);

    const filter2 = { location_id: 2 };
    expect(pipe.transform(locations, filter2)).toEqual([
      { id: 2, name: 'Nueva York' },
    ]);

    const filter3 = { location_id: 4 };
    expect(pipe.transform(locations, filter3)).toEqual([
      { id: 4, name: 'Paris' },
    ]);
  });

  it('should return an empty array if no location matches the filter', () => {
    const locations = [
      { id: 1, name: 'Tokio' },
      { id: 2, name: 'Nueva York' },
      { id: 3, name: 'Londres' },
      { id: 4, name: 'Paris' },
    ];

    const filter = { location_id: 999 };
    expect(pipe.transform(locations, filter)).toEqual([]);
  });

  it('should return the original array if no filter is provided', () => {
    const locations = [
      { id: 1, name: 'Tokio' },
      { id: 2, name: 'Nueva York' },
      { id: 3, name: 'Londres' },
      { id: 4, name: 'Paris' },
    ];

    expect(pipe.transform(locations, null)).toEqual(locations);
  });
});
