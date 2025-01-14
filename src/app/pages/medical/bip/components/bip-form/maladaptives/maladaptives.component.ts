import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GoalV2 } from 'src/app/core/models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maladaptives[maladaptives]',
  templateUrl: './maladaptives.component.html',
  styleUrls: ['./maladaptives.component.scss'],
})
export class MaladaptivesComponent {
  @Input() maladaptives: GoalV2[];
  @Output() maladaptivesChange = new EventEmitter<GoalV2[]>();
  @Output() save = new EventEmitter<GoalV2[]>();
  text_validation = '';
  newMaladaptive: GoalV2 = GoalV2.getDefault();

  addMaladaptive() {
    if (
      !this.newMaladaptive.baseline_date ||
      !this.newMaladaptive.baseline_level ||
      !this.newMaladaptive.current_intensity ||
      !this.newMaladaptive.initial_intensity ||
      !this.newMaladaptive.name ||
      !this.newMaladaptive.description
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
    this.newMaladaptive = GoalV2.getDefault();
    this.maladaptivesChange.emit(this.maladaptives);
  }

  deleteMaladaptive(i: number) {
    this.maladaptives.splice(i, 1);
    this.maladaptivesChange.emit(this.maladaptives);
  }

  seleccionarParaEditMal(maladap: GoalV2) {
    const selectedMaladaptive = this.maladaptives.find(
      (item) => item.index === maladap.index
    );
    if (selectedMaladaptive) {
      this.newMaladaptive = selectedMaladaptive;
    }
  }

  updateMaladaptive(maladap: GoalV2) {
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
