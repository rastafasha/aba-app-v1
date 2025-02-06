import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-split-table',
  template: `
    <div class="split-table-container" [class.split]="shouldSplit">
      <div class="table-section">
        <div class="table-responsive">
          <table class="table mb-0">
            <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            <tbody>
              <tr *ngFor="let item of firstHalf">
                <ng-container *ngTemplateOutlet="rowTemplate; context: { $implicit: item }"></ng-container>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="table-section" *ngIf="shouldSplit">
        <div class="table-responsive">
          <table class="table mb-0">
            <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            <tbody>
              <tr *ngFor="let item of secondHalf">
                <ng-container *ngTemplateOutlet="rowTemplate; context: { $implicit: item }"></ng-container>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .split-table-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .split-table-container.split {
      flex-direction: row;
    }

    .table-section {
      flex: 1;
    }

    @media (max-width: 991px) {
      .split-table-container.split {
        flex-direction: column;
      }
    }
  `]
})
export class SplitTableComponent {
  @Input() data: any[] = [];
  @Input() headerTemplate!: TemplateRef<any>;
  @Input() rowTemplate!: TemplateRef<any>;

  get shouldSplit(): boolean {
    return window.innerWidth > 991;
  }

  get firstHalf(): any[] {
    const halfLength = Math.ceil(this.data.length / 2);
    return this.data.slice(0, halfLength);
  }

  get secondHalf(): any[] {
    const halfLength = Math.ceil(this.data.length / 2);
    return this.data.slice(halfLength);
  }
}
