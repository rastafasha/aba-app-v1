import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConsentToTreatment } from 'src/app/core/models';
@Component({
  selector: 'app-consent-treatment-form',
  templateUrl: './consent-treatment-form.component.html',
  styleUrls: ['./consent-treatment-form.component.scss'],
})
export class ConsentTreatmentFormComponent {
  @Input() consent_to_treatment: ConsentToTreatment;
  @Output() consent_to_treatmentChange = new EventEmitter<ConsentToTreatment>();
  @Output() save = new EventEmitter<void>();

  public text_validation = '';
  public FILE_SIGNATURE_ANALYST: File;
  public IMAGE_PREVISUALIZA_SIGNATURE_ANALYST = 'assets/img/user-06.jpg';
  public IMAGE_PREVISUALIZA_SIGNATURE_ANALYST_CREATED =
    'assets/img/user-06.jpg';
  public FILE_SIGNATURE_PARENT: File;
  public IMAGE_PREVISUALIZA_SIGNATURE_PARENT = 'assets/img/user-06.jpg';
  public IMAGE_PREVISUALIZA_SIGNATURE_PARENT_CREATED = 'assets/img/user-06.jpg';

  //funcion para la primera imagen.. funciona
  onLoadFile($event: Event, to: 'analyst' | 'parent') {
    const event = $event as Event & {
      target: HTMLInputElement & { files: FileList | null };
    };
    if (
      (
        event.target as HTMLInputElement & { files: FileList | null }
      ).files[0].type.indexOf('image')
    ) {
      this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
      return;
    }
    this.text_validation = '';
    switch (to) {
      case 'analyst':
        this.FILE_SIGNATURE_ANALYST = event.target.files[0];
        break;
      case 'parent':
        this.FILE_SIGNATURE_PARENT = event.target.files[0];
        break;
      default:
        break;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.FILE_SIGNATURE_ANALYST);
    reader.onloadend = () =>
      (this.IMAGE_PREVISUALIZA_SIGNATURE_ANALYST = reader.result as string);
  }

  onSave() {
    this.consent_to_treatmentChange.emit(this.consent_to_treatment);
    this.save.emit();
  }
}
