import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-intake-outcome-measures-used',
  template: `
   <div class="card">
      <div class="card-header">
        <h4 class="card-title">Intake and Outcome Measures</h4>
      </div>
      <!-- body card -->
      <div class="card-body p-0">
      <div class="table-responsive content-box">
        <div class="p-3">
            <div>
                {{ intake_outcome_measures_used.join(', ') }}
            </div>
        </div>
      </div>
    </div>
  `,
})
export class IntakeOutcomeMeasuresUsedComponent {
  @Input() intake_outcome_measures_used: string[];
}
