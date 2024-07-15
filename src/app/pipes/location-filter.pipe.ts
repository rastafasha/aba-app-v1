import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'locationFilter'
})
export class LocationFilterPipe implements PipeTransform {
  user: any;
  transform(locations: any[]): any[] {
    return locations.filter(location => location.id === this.user.location_id );
  }
}