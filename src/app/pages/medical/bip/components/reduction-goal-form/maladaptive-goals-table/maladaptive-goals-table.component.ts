import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GoalV2 } from 'src/app/core/models';
import { ListOption } from 'src/app/shared/components/list/list.component';

@Component({
  selector: 'app-maladaptive-goals-table',
  templateUrl: './maladaptive-goals-table.component.html',
  styleUrls: ['./maladaptive-goals-table.component.scss'],
})
export class MaladaptiveGoalsTableComponent {
  @Input() maladaptives: GoalV2[] = [];
  @Output() edit = new EventEmitter<GoalV2>();
  @Output() viewGraph = new EventEmitter<GoalV2>();
  @Output() delete = new EventEmitter<GoalV2>();
  options: ListOption<GoalV2>[] = [
    {
      text: 'Edit',
      class: 'btn btn-outline-primary btn-sm',
      icon: 'fa fa-edit',
      action: (maladaptive) => this.edit.emit(maladaptive),
    },
    {
      text: 'Graph',
      class: 'btn btn-outline-success btn-sm',
      icon: 'fa fa-bar-chart',
      action: (maladaptive) => this.viewGraph.emit(maladaptive),
    },
    {
      text: 'Delete',
      class: 'btn btn-outline-danger btn-sm',
      icon: 'fa fa-trash-alt',
      action: (maladaptive) => this.delete.emit(maladaptive),
    },
  ];
}
