import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Intervention } from '../interfaces';

@Component({
  selector: 'app-interventions3',
  templateUrl: 'interventions2.component.html',
  
})
export class Interventions2Component {
  @Input() interventionsList: Intervention[];
  @Output() update = new EventEmitter<object>();

  updatedInterventions2() {
    const result = this.interventionsList
      .filter((intervention) => intervention.value)
      .reduce((acc, intervention) => {
        acc[intervention.id] = true;
        return acc;
      }, {});
      console.log(result);
    this.update.emit(result);
  }
}
