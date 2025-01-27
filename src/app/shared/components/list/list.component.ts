import { Component, EventEmitter, Input, Output } from '@angular/core';
export interface AddButtonOption {
  show: boolean;
  text: string;
  class: string;
  icon: string;
}

export interface ListOption<T> {
  text: string;
  class: string;
  icon: string;
  action: (item: T, context?: unknown) => void;
}

export type KeyOf<T> = keyof T;
export type ListRender<T> = Partial<Record<keyof T, (x: T) => string>>;
export type HeadRender<T> = Partial<Record<keyof T, (x: string) => string>>;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent<T> {
  @Input() context?: unknown;
  @Input() title = '';
  @Input() dataSource: T[] = null;
  @Input() displayedColumns: (keyof T)[] = [];
  @Input() options: ListOption<T>[] = null;
  @Output() add = new EventEmitter<void>();
  //options
  @Input() addButtonOptions: AddButtonOption = {
    show: false,
    text: 'Add',
    class: 'btn btn-primary',
    icon: 'fas fa-plus',
  };
  @Input() noDataText: string = null;
  @Input() renders: ListRender<T>;
  @Input() headRenders: HeadRender<T>;

  onAdd() {
    this.add.emit();
  }
  onClick(option: ListOption<T>, value: T): void {
    option.action(value, this.context);
  }
}
