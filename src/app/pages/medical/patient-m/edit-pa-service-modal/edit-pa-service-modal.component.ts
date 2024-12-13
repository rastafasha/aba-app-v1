import { Component, Inject } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaServiceV2 } from 'src/app/core/models';
import { PaServicesV2Service } from 'src/app/core/services/pa-services.v2.service';

type PaServiceV2FormControls = {
  [T in keyof PaServiceV2]: AbstractControl<PaServiceV2[T]>;
};

@Component({
  selector: 'app-edit-pa-service-modal',
  templateUrl: './edit-pa-service-modal.component.html',
  styleUrls: ['./edit-pa-service-modal.component.scss'],
})
export class EditPaServiceModalComponent {
  paForm: FormGroup<PaServiceV2FormControls>;
  id = 0;
  paService: PaServiceV2 = {} as PaServiceV2;
  isDisabledUpdate = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditPaServiceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { paService: PaServiceV2 },
    private paServicesService: PaServicesV2Service
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
    this.paService = this.data.paService;
    this.paForm.patchValue(this.paService);
  }

  onUpdate() {
    this.isDisabledUpdate = true;
    this.paService = { ...this.paService, ...this.paForm.value };
    this.paServicesService.update(this.paService, this.paService.id).subscribe(
      () => {
        this.isDisabledUpdate = false;
        this.dialogRef.close();
      },
      () => {
        this.isDisabledUpdate = false;
      }
    );
  }
}
