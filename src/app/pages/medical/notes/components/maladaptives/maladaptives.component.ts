import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-maladaptives-options',
  styleUrls: ['../../edit-note-rbt/edit-note-rbt.component.scss'],
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
          <ng-container *ngFor="let behav of maladaptives; let i = index">
            <div class="col-12 col-md-4 mb-4">
              <div class="graphic-value">
                <div class="title mb-2">
                  <h4 class="label">{{ behav.name }}</h4>
                </div>
                <input
                  class="form-control mb-2"
                  [name]="'number_of_occurrences_' + i"
                  [(ngModel)]="behav.number_of_occurrences"
                  type="number"
                  min="0"
                  required
                  [ngClass]="{
                    'is-valid': behav.number_of_occurrences >= 0,
                    'is-invalid':
                      behav.number_of_occurrences < 0 ||
                      behav.number_of_occurrences === undefined

                  }"
                />
                <div class="invalid-feedback">
                  Please enter a valid number (0 or greater).
                </div>
              </div>
            </div>
          </ng-container>
        </div>
      </form>
    </div>
  `,
})
export class MaladaptivesOptionsComponent {
  @Input() maladaptives = [];
  @Output() maladaptivesChange = new EventEmitter<any>();

}
