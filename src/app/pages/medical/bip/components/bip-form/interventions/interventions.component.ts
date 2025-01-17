import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListFormStrategy } from '../list-form.strategy';
import { Intervention } from 'src/app/core/models';

@Component({
  selector: 'app-interventions',
  templateUrl: './interventions.component.html',
  styleUrls: ['./interventions.component.scss'],
})
export class InterventionsComponent {
  @Output() save = new EventEmitter<void>();
  text_validation = '';
  //
  @Input() interventions: Intervention[] = [];
  @Output() interventionsChange = new EventEmitter<Intervention[]>();
  newIntervention: Intervention = {
    index: 0,
    descriptionIntervention: '',
    titleIntervention: '',
  };
  interventionStrategy = new ListFormStrategy<Intervention>(
    this.interventionsChange,
    this.newIntervention
  );
  //

  addIntervention() {
    const result = this.interventionStrategy.add(
      this.validate,
      this.interventions,
      this.newIntervention
    );
    this.text_validation = result.text;
    this.interventions = result.items;
    this.newIntervention = result.item;
  }

  deleteIntervention(i: number) {
    this.interventions = this.interventionStrategy.delete(
      i,
      this.interventions
    );
  }

  updateIntervention(intervention: Intervention) {
    this.newIntervention = this.interventionStrategy.updateList(
      this.interventions,
      intervention
    );
  }

  seleccionarParaEdit(intervention: Intervention) {
    this.newIntervention = this.interventionStrategy.select(
      this.interventions,
      intervention
    );
  }

  onSave(): void {
    this.save.emit();
  }

  private validate = () => {
    return !!(
      this.newIntervention.descriptionIntervention &&
      this.newIntervention.titleIntervention
    );
  };
}
