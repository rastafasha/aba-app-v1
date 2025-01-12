import { Component, Input } from '@angular/core';

export interface ListOption<T> {
  text: string;
  class: string;
  icon: string;
  action: (item: T) => void;
}

export type ListRender<T> = Partial<Record<keyof T, (x: T) => string>>;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent<T> {
  @Input() title = '';
  @Input() dataSource: T[] = null;
  @Input() displayedColumns: (keyof T)[] = [];
  @Input() options: ListOption<T>[] = null;
  //options
  @Input() noDataText: string = null;
  @Input() renders: ListRender<T>;

  onClick(option: ListOption<T>, value: T): void {
    option.action(value);
  }
}
