import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-maladaptives',
  template: `
    <div class="col-12">
      <h4>Maladaptives</h4>
      <p class="text">
        Note: Please fill out all fields, if you didn't have any reaction, enter
        "0"
      </p>
    </div>
    <div class="container">
      <form autocomplete="off">
        <div class="row">
          <ng-container *ngFor="let behavior of maladaptives; let i = index">
            <div class="col-xs-12 col-sm-3 graphic-value mb-4">
              <div class="title mb-2">
                <h4 class="label">{{ behavior.name }}</h4>
              </div>
              <input
                class="form-control mb-2"
                [name]="'number_of_occurrences_' + i"
                [(ngModel)]="behavior.number_of_occurrences"
                type="number"
                min="0"
                required
                [ngClass]="{
                  'is-valid': behavior.number_of_occurrences >= 0,
                  'is-invalid':
                    behavior.number_of_occurrences < 0 ||
                    behavior.number_of_occurrences === undefined
                }"
              />
              <div class="invalid-feedback">
                Please enter a valid number (0 or greater).
              </div>
            </div>
          </ng-container>
        </div>
      </form>
    </div>
  `,
})
export class MaladaptivesComponent {
  @Input() maladaptives: any[] = [];
  @Output() maladaptivesChange = new EventEmitter<any[]>();
}
