import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditLeaveRoutingModule } from './edit-leave.routing';
import { EditLeaveComponent } from './edit-leave.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [EditLeaveComponent],
  imports: [CommonModule, EditLeaveRoutingModule, SharedModule],
})
export class EditLeaveModule {}
