import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeEscalationTechnique, Recomendation } from 'src/app/core/models';

@Component({
  selector: 'app-de-escalation-tecniques',
  templateUrl: './de-escalation-tecniques.component.html',
  styleUrls: ['./de-escalation-tecniques.component.scss'],
})
export class DeEscalationTecniquesComponent {
  @Input() de_escalation_technique: DeEscalationTechnique;
  @Output() de_escalation_techniqueChange =
    new EventEmitter<DeEscalationTechnique>();
  @Output() save = new EventEmitter<DeEscalationTechnique>();
  // Recomendations
  newRecomendation: Recomendation = Recomendation.getDefault();
  text_validation = '';

  onSave() {
    this.de_escalation_techniqueChange.emit(this.de_escalation_technique);
    this.save.emit(this.de_escalation_technique);
  }
}
/*
  deleteDocument(escalation: any) {
    const index = this.de_escalation_technique.recomendation_lists.findIndex(
      (element) => element.index === escalation.index
    );
    if (index !== -1) {
      this.de_escalation_technique.recomendation_lists.splice(index, 1);
    }
  }

  seleccionarParaEdit(escalation: any) {
    const selectedEscalation =
      this.de_escalation_technique.recomendation_lists.find(
        (item) => item.index === escalation.index
      );
    if (selectedEscalation) {
      this.escalation_edit = selectedEscalation;
      // Ahora puedes editar el objeto selectedCaregiver
      selectedEscalation.nombre = 'Nuevo nombre'; // Por ejemplo
    }
  }

  updateEscalation(escalation: any) {
    const index = this.de_escalation_technique.recomendation_lists.findIndex(
      (item) => item.index === escalation.index
    );
    if (index !== -1) {
      this.de_escalation_technique.recomendation_lists[index] = escalation;
      Swal.fire(
        'Updated',
        `Updated item List successfully, if you finish the list, now press button save!`,
        'success'
      );
    }
  }

  onSave() {
    this.text_validation = '';
    if (!this.de_escalation_technique.recomendation_lists) {
      this.text_validation = 'All Fields (*) are required';
      return;
    }

    const data = {
      id: this.deEscalalationsTechid,
      bip_id: this.bip_selectedIdd,
      patient_identifier: this.patient_identifier,
      client_id: this.client_id,
      description: this.description,
      service_recomendation: this.service_recomendation,
      recomendation_lists: this.de_escalation_technique.recomendation_lists,
    };

    if (this.client_id_deEscalalationsTechs && this.deEscalalationsTechid) {
      this.deEscalationTechniqueService
        .editDeEscalationTechnique(data, this.deEscalalationsTechid)
        .subscribe((resp) => {
          // console.log(resp);
          // this.text_success = 'Goal Updated'
          Swal.fire(
            'Updated',
            `De Escalation Technique Updated successfully!`,
            'success'
          );
          this.ngOnInit();
        });
    } else {
      this.deEscalationTechniqueService
        .createDeEscalationTechnique(data)
        .subscribe((resp) => {
          // console.log(resp);
          this.goalFamilyid = resp.id;
          // this.text_success = 'Goal created successfully!'
          Swal.fire(
            'Created',
            `De Escalation Technique Created successfully!`,
            'success'
          );
          this.ngOnInit();
        });
    }
  }

  cambiarStatus(escalation: any) {
    this.location_edit = escalation;
    // console.log(this.location_edit.location);

    const data = {
      recomendation_lists: this.de_escalation_technique.recomendation_lists,
    };

    this.deEscalationTechniqueService
      .editDeEscalationTechnique(data, this.deEscalalationsTechid)
      .subscribe((resp) => {
        // console.log(resp);
        // this.getTableData();
        Swal.fire('Updated', `Goal Updated successfully!`, 'success');
        this.ngOnInit();
      });
  }
}
*/
