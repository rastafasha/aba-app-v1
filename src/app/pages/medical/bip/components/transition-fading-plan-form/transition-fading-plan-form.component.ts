import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseDialogComponent } from '../shared/base-dialog.component';
import { TransitionFadingPlan } from 'src/app/core/models';

@Component({
  selector: 'app-transition-fading-plan-form',
  templateUrl: './transition-fading-plan-form.component.html',
  styleUrls: ['./transition-fading-plan-form.component.scss'],
})
export class TransitionFadingPlanFormComponent extends BaseDialogComponent<TransitionFadingPlan> {
  @Input() input: TransitionFadingPlan;
  @Output() inputChange = new EventEmitter<TransitionFadingPlan>();
  @Output() save = new EventEmitter<TransitionFadingPlan>();

  constructor(dialogRef: MatDialogRef<TransitionFadingPlanFormComponent>) {
    super(dialogRef);
  }

  onSave() {
    this.inputChange.emit(this.input);
    this.save.emit(this.input);
  }
}
