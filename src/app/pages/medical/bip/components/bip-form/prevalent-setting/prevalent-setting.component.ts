import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrevalentSettingEventAndAntecedent } from 'src/app/core/models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prevalent-setting',
  templateUrl: './prevalent-setting.component.html',
  styleUrls: ['./prevalent-setting.component.scss'],
})
export class PrevalentSettingComponent {
  @Output() save = new EventEmitter<void>();
  @Input()
  prevalentSettingEventAndAntecedents: PrevalentSettingEventAndAntecedent[] =
    [];
  @Output() prevalentSettingEventAndAntecedentsChange = new EventEmitter<
    PrevalentSettingEventAndAntecedent[]
  >();
  newItem: PrevalentSettingEventAndAntecedent =
    PrevalentSettingEventAndAntecedent.getDeafult();

  //
  text_validation = '';

  addPrevalent() {
    if (!this.validate()) {
      this.text_validation =
        'Prevalent Setting Event And Antecedent is required';
      return;
    }
    this.text_validation = '';
    this.prevalentSettingEventAndAntecedents ??= [];
    this.newItem.index = this.prevalentSettingEventAndAntecedents.length + 1;
    this.prevalentSettingEventAndAntecedents.push({
      ...this.newItem,
    });
    this.newItem = {
      index: 0,
      prevalent_setting_event_and_atecedent: '',
      behavior: '',
      hypothesized_functions: '',
    };
    this.prevalentSettingEventAndAntecedentsChange.emit(
      this.prevalentSettingEventAndAntecedents
    );
  }

  deletePrevalent(i: number) {
    this.prevalentSettingEventAndAntecedents.splice(i, 1);
    this.emit();
  }

  seleccionarPrevalent(tang: PrevalentSettingEventAndAntecedent) {
    const selectedTangible = this.prevalentSettingEventAndAntecedents.find(
      (item) => item.index === tang.index
    );
    if (!selectedTangible) {
      return;
    }
    this.newItem = selectedTangible;
  }

  updateItemListPrevalent(prevalent: PrevalentSettingEventAndAntecedent) {
    this.newItem = prevalent;
    Swal.fire(
      'Updated',
      `Updated item List successfully, if you finish the list, now press button save!`,
      'success'
    );
    const index = this.prevalentSettingEventAndAntecedents.findIndex(
      (item) => item.index === prevalent.index
    );
    if (index !== -1) {
      this.prevalentSettingEventAndAntecedents[index] = prevalent;
      Swal.fire(
        'Updated',
        `Updated item List successfully, if you finish the list, now press button save!`,
        'success'
      );
    }
    this.emit();
  }

  onSave(): void {
    this.save.emit();
  }

  private validate() {
    return (
      this.newItem.behavior &&
      this.newItem.hypothesized_functions &&
      this.newItem.prevalent_setting_event_and_atecedent
    );
  }
  private emit() {
    this.prevalentSettingEventAndAntecedentsChange.emit(
      this.prevalentSettingEventAndAntecedents
    );
  }
}
