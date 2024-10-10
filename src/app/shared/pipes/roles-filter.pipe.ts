import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleFilter',
})
export class RoleFilterPipe implements PipeTransform {
  constructor() {
    //
  }
  transform<T extends { name: string }>(roles: T[]): T[] {
    return roles.filter((role) => role.name === 'RBT' || role.name === 'BCBA');
  }
}
