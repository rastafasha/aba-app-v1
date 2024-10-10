import { Pipe, PipeTransform } from '@angular/core';

interface LocationFilter {
  location_id: number;
}
@Pipe({
  name: 'locationFilter',
})
export class LocationFilterPipe implements PipeTransform {
  transform<T extends { id: number }>(
    locations: T[],
    filter: LocationFilter
  ): T[] {
    if (!filter) return locations;
    return locations.filter((location) => location.id === filter.location_id);
  }
}
