import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Maladaptive } from 'src/app/pages/dashboard/models/dashboard.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maladaptives[maladaptives]',
  templateUrl: './maladaptives.component.html',
  styleUrls: ['./maladaptives.component.scss'],
})
export class MaladaptivesComponent {
  @Input() maladaptives: Maladaptive[];
  @Output() maladaptivesChange = new EventEmitter<Maladaptive[]>();
  @Output() save = new EventEmitter<Maladaptive[]>();
  text_validation = '';
  newMaladaptive: Maladaptive = {
    index: 0,
    name: '',
    current_intensity: 0,
    baseline_date: '',
    baseline_level: 0,
    initial_interesting: 0,
    maladaptive_behavior: '',
    topografical_definition: '',
  };

  addMaladaptive() {
    if (
      !this.newMaladaptive.baseline_date ||
      !this.newMaladaptive.baseline_level ||
      !this.newMaladaptive.current_intensity ||
      !this.newMaladaptive.initial_interesting ||
      !this.newMaladaptive.maladaptive_behavior ||
      !this.newMaladaptive.topografical_definition
    ) {
      this.text_validation = 'All fields are required';
      return;
    }
    this.text_validation = '';
    this.maladaptives ??= [];
    this.maladaptives.push({
      ...this.newMaladaptive,
      index: this.maladaptives.length + 1,
    });
    this.newMaladaptive = {
      index: 0,
      name: '',
      current_intensity: 0,
      baseline_date: '',
      baseline_level: 0,
      initial_interesting: 0,
      maladaptive_behavior: '',
      topografical_definition: '',
    };
    this.maladaptivesChange.emit(this.maladaptives);
  }

  deleteMaladaptive(i: number) {
    this.maladaptives.splice(i, 1);
    this.maladaptivesChange.emit(this.maladaptives);
  }

  seleccionarParaEditMal(maladap: Maladaptive) {
    const selectedMaladaptive = this.maladaptives.find(
      (item) => item.index === maladap.index
    );
    if (selectedMaladaptive) {
      this.newMaladaptive = selectedMaladaptive;
      selectedMaladaptive.name = 'Nuevo nombre';
    }
  }

  updateMaladaptive(maladap: Maladaptive) {
    const index = this.maladaptives.findIndex(
      (item) => item.index === maladap.index
    );
    if (index === -1) {
      Swal.fire('Error', `Error updating item list, try again later`, 'error');
      return;
    }
    this.maladaptives[index] = { ...maladap };
    Swal.fire(
      'Updated',
      `Updated item List successfully, if you finish the list, now press button save!`,
      'success'
    );
    this.maladaptivesChange.emit(this.maladaptives);
  }

  onSave() {
    this.save.emit(this.maladaptives);
  }
}
