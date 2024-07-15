import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleFilter'
})
export class RoleFilterPipe implements PipeTransform {
  transform(roles: any[]): any[] {
    return roles.filter(role => role.name === 'RBT' || role.name === 'BCBA');
  }
}