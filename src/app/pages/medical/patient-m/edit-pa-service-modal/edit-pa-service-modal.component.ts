import { Component } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder } from '@angular/forms';
import { PaServiceV2 } from 'src/app/core/models';


type PaServiceV2FormControls = {
  [T in keyof PaServiceV2]: AbstractControl<PaServiceV2[T]>;
};


@Component({
  selector: 'app-edit-pa-service-modal',
  templateUrl: './edit-pa-service-modal.component.html',
  styleUrls: ['./edit-pa-service-modal.component.scss']
})
export class EditPaServiceModalComponent {
  paForm: FormGroup<PaServiceV2FormControls>;
  id = 0;
  paService :PaServiceV2 = {} as PaServiceV2;

  constructor(
    private fb: FormBuilder,
  ) { 

    this.paForm = this.fb.group<PaServiceV2FormControls>({
      id: this.fb.control(0),
      patient_id: this.fb.control(this.id),
      pa_service: this.fb.control(''), //the name of the service
      cpt: this.fb.control(null as string),
      n_units: this.fb.control(null as number),
      spent_units: this.fb.control(null as number),
      start_date: this.fb.control(new Date()),
      end_date: this.fb.control(null as Date),
      created_at: this.fb.control(null as Date),
      updated_at: this.fb.control(null as Date),
      deleted_at: this.fb.control(null as Date),
    });
  }
 
  onUpdate(){
    console.log(this.paForm.value);
  }

}
