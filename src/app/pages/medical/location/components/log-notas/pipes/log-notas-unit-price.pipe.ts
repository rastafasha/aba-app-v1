import { Pipe, PipeTransform } from '@angular/core';
import { Insurance } from '../../../models/locations.model';

@Pipe({
  name: 'logNotasUnitPrice',
})
export class LogNotasUnitPricePipe implements PipeTransform {
  transform(
    cpt: string,
    insurance_id: number,
    insurances: Insurance[]
  ): number {
    const insurance = insurances?.find((i) => i.id === insurance_id);
    if (insurance) {
      const service = insurance.services.find((s) => s.code === cpt);
      if (service) {
        return service.unit_prize;
      }
      return null;
    }
    return null;
  }
}
