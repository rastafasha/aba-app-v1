import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rbtFilter'
})
export class RbtFilterPipe implements PipeTransform {

  transform(services: any[]): any[] {
    if (!services) {
      return services;
    }
    return services.filter(service => service.cpt.startsWith('97153'));
  }

}


