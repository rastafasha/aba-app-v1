import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReplacementService {

  constructor() { }

  public getEstimatedPercentaje(initial_date: Date, target: number): number {
    const initialDate = new Date(initial_date);
    const endDate = new Date(initial_date);
    const percentajeBase = target / 12;
    let expectedPercentaje = target / 12;
    for (let index = 0; index < 12; index++) {
      endDate.setDate(endDate.getDate() + 7);
      if (new Date() >= initialDate && new Date() < endDate)
        expectedPercentaje += percentajeBase * index;
      initialDate.setDate(initialDate.getDate() + 7);
    }
    if(endDate <= new Date()) return 100;
    return (expectedPercentaje*100/23);
  }
}
