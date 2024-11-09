import { Pipe, PipeTransform } from '@angular/core';
import { InsuranceV2 } from 'src/app/core/models';

@Pipe({
  name: 'logReportsUnitPrice',
})
export class LogReportsUnitPricePipe implements PipeTransform {
  transform(
    cpt: string,
    insurance_id: number,
    insurances: InsuranceV2[]
  ): number {
    const insurance = insurances?.find((i) => i.id === insurance_id);
    if (insurance) {
      const service = insurance.services.find((s) => s.code === cpt);
      if (service) {
        return service.unit_price;
      }
      return null;
    }
    return null;
  }
}
