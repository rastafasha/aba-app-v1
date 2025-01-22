import { Component } from '@angular/core';
import { Escape } from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-escape-form',
  templateUrl: './escape-form.component.html',
  styleUrls: ['./escape-form.component.scss'],
})
export class EscapeFormComponent extends InputDirective<Escape> {}
