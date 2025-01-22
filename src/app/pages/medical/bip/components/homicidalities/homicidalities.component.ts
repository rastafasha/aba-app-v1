import { Component } from '@angular/core';
import { Homicidality } from 'src/app/core/models';
import { InputDirective } from 'src/app/shared/directives/input.directive';

@Component({
  selector: 'app-homicidalities',
  templateUrl: './homicidalities.component.html',
  styleUrls: ['./homicidalities.component.scss'],
})
export class HomicidalitiesComponent extends InputDirective<Homicidality> {}
