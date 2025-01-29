import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReplacementProtocol } from '../interfaces';

@Component({
  selector: 'app-replacements3',
  template: `
    <div class="col-12">
      <h5>Replacement Protocols</h5>
      <div class="table-responsive">
        <table class="table mb-0">
          <thead>
            <tr>
              <th>Protocol</th>
              <th>Demonstrated</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let protocol of replacementProtocols">
              <td>{{ protocol.description }}</td>
              <td>
                <div class="status-toggle d-flex justify-content-between align-items-center">
                  <input
                    type="checkbox"
                    [id]="protocol.id + '-demonstrated'"
                    class="check"
                    [(ngModel)]="protocol.demonstrated"
                    [name]="protocol.id + '-demonstrated'"
                    (ngModelChange)="updateProtocols()"
                  />
                  <label [for]="protocol.id + '-demonstrated'" class="checktoggle">checkbox</label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class Replacements3Component {
  @Input() set replacementProtocols(protocols: ReplacementProtocol[]) {
    this._protocols = protocols.map(p => ({
      ...p,
      demonstrated: false
    }));
  }
  get replacementProtocols(): ReplacementProtocol[] {
    return this._protocols;
  }

  @Output() protocolsChange = new EventEmitter<ReplacementProtocol[]>();

  private _protocols: ReplacementProtocol[] = [];

  updateProtocols() {
    this.protocolsChange.emit(this._protocols);
  }
}
