import { Component } from '@angular/core';
import { ConsentToTreatment, PLAN_CONST } from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-consent-treatment-form',
  templateUrl: './consent-treatment-form.component.html',
  styleUrls: ['./consent-treatment-form.component.scss'],
})
export class ConsentTreatmentFormComponent extends InputDirective<ConsentToTreatment> {
  consent = PLAN_CONST.CONSENT;
  image_placeholder = 'assets/img/user-06.jpg';

  FILE_SIGNATURE_ANALYST: File;
  IMAGE_PREVISUALIZA_SIGNATURE_ANALYST = 'assets/img/user-06.jpg';
  IMAGE_PREVISUALIZA_SIGNATURE_ANALYST_CREATED = 'assets/img/user-06.jpg';
  FILE_SIGNATURE_PARENT: File;
  IMAGE_PREVISUALIZA_SIGNATURE_PARENT = 'assets/img/user-06.jpg';
  IMAGE_PREVISUALIZA_SIGNATURE_PARENT_CREATED = 'assets/img/user-06.jpg';

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
      return;
    }

    const file = event.target.files[0];
    switch (to) {
      case 'analyst':
        this.FILE_SIGNATURE_ANALYST = file;
        break;
      case 'parent':
        this.FILE_SIGNATURE_PARENT = file;
        break;
      default:
        break;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      if (to === 'analyst') {
        this.IMAGE_PREVISUALIZA_SIGNATURE_ANALYST = dataUrl;
        this.input.analyst_signature = dataUrl;
      }
      if (to === 'parent') {
        this.IMAGE_PREVISUALIZA_SIGNATURE_PARENT = dataUrl;
        this.input.parent_guardian_signature = dataUrl;
      }
    };
  }

  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }
}
