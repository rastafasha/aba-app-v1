import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-assessment-tools-view',
  template: `
   <div class="card">
      <div class="card-header">
        <h4 class="card-title">Assessment Tools Used</h4>
      </div>
      <!-- body card -->
      <div class="card-body p-0">
      <div class="table-responsive content-box">
        <div class="p-3">
            <div>
                {{ assessment_tools_used.join(', ') }}
            </div>
        </div>
      </div>
    </div>
  `,
})
export class AssessmentToolsViewComponent {
  @Input() assessment_tools_used: string[];
}
