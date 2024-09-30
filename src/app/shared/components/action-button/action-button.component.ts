import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-action-button',
  template: `
    <button class="btn" [ngClass]="buttonClass" (click)="clicked.emit()">
      <i [class]="icon"></i> {{ title }}
    </button>
  `,
  styles: [`
    .btn {
      width: 100%;
      margin-bottom: 10px;
      padding: 11px;
      text-align: left;
    }
  `]
})
export class ActionButtonComponent {
  @Input() title: string;
  @Input() icon: string;
  @Input() buttonClass: string;
  @Output() clicked = new EventEmitter<void>();
}
