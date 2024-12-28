import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDisponibilidadCpt'
})
export class FilterDisponibilidadCptPipe implements PipeTransform {

  transform(pa_services: any[], startDate: Date, endDate: Date): any[] {
    // Validate inputs
    if (!pa_services || !Array.isArray(pa_services) || !startDate || !endDate) {
      return []; // Return an empty array if inputs are invalid
    }
    
    return pa_services.filter(service => {
      // Assuming each service has a date property to compare
      const serviceDate = new Date(service.date); // Replace 'date' with the actual date property of the service
      return !isNaN(serviceDate.getTime()) && // Ensure the date is valid
             serviceDate >= startDate && 
             serviceDate <= endDate;
    });
  }

}
