import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReplacementProtocol } from '../interfaces';

@Component({
  selector: 'app-replacements2',
  template: `
    <div class="col-12">
      <h5>Replacement Protocols</h5>
      <div class="table-responsive">
        <table class="table mb-0">
          <thead>
            <tr>
              <th>Protocol</th>
              <th>Assessed</th>
              <th>Modified</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let protocol of replacementProtocols">
              <td>{{ protocol.description }}</td>
              <td>
                <div class="status-toggle d-flex justify-content-between align-items-center">
                  <input
                    type="checkbox"
                    [id]="protocol.id + '-assessed'"
                    class="check"
                    [(ngModel)]="protocol.assessed"
                    [name]="protocol.id + '-assessed'"
                    (ngModelChange)="updateProtocols()"
                  />
                  <label [for]="protocol.id + '-assessed'" class="checktoggle">checkbox</label>
                </div>
              </td>
              <td>
                <div class="status-toggle d-flex justify-content-between align-items-center">
                  <input
                    type="checkbox"
                    [id]="protocol.id + '-modified'"
                    class="check"
                    [(ngModel)]="protocol.modified"
                    [name]="protocol.id + '-modified'"
                    (ngModelChange)="updateProtocols()"
                  />
                  <label [for]="protocol.id + '-modified'" class="checktoggle">checkbox</label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class Replacements2Component {
  private _protocols: ReplacementProtocol[] = [];

  @Input() set replacementProtocols(protocols: ReplacementProtocol[]) {
    // Only initialize values if they haven't been set before
    this._protocols = protocols.map(p => {
      const existingProtocol = this._protocols.find(ep => ep.id === p.id);
      return {
        ...p,
        assessed: existingProtocol?.assessed ?? false,
        modified: existingProtocol?.modified ?? false
      };
    });
  }

  get replacementProtocols(): ReplacementProtocol[] {
    return this._protocols;
  }

  @Output() protocolsChange = new EventEmitter<ReplacementProtocol[]>();

  updateProtocols() {
    // Emit a copy of the protocols to ensure change detection
    this.protocolsChange.emit([...this._protocols]);
  }
}
