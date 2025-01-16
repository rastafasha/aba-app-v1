import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ListFormStrategy } from 'src/app/pages/medical/bip/components/bip-form/list-form.strategy';
import { ListOption, ListRender } from '../list/list.component';

@Component({
  selector: 'app-list-and-form',
  templateUrl: './list-and-form.component.html',
  styleUrls: ['./list-and-form.component.scss'],
})
export class ListAndFormComponent<T> {
  @ViewChild('content', { static: true }) htmlTemplate: TemplateRef<unknown>;
  @Input() title = '';
  @Input() hadButton = true;
  @Input() canOpen = true;
  @Input() default: T = null;
  @Input() dataSource: T[] = null;
  @Output() dataSourceChange = new EventEmitter<T[]>();
  @Output() edit = new EventEmitter<T>();
  @Output() view = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();
  @Output() add = new EventEmitter<ListAndFormComponent<T>>();
  @Input() displayedColumns: (keyof T)[] = [];
  //options
  @Input() noDataText: string = null;
  @Input() openButtonText: string = null;
  @Input() renders: ListRender<T>;
  strategy = new ListFormStrategy<T>(this.dataSourceChange, this.default);
  options: ListOption<T>[] = [
    {
      text: 'Edit',
      icon: 'fa fa-edit',
      class: 'btn btn-outline-primary btn-sm',
      action: (item: T) => this.onEdit(item),
    },
    {
      text: 'View',
      icon: 'fa fa-bar-chart',
      class: 'btn btn-outline-success btn-sm',
      action: (item: T) => this.onView(item),
    },
    {
      text: 'Delete',
      icon: 'fa fa-trash-alt',
      class: 'btn btn-outline-danger btn-sm',
      action: (item: T) => this.onDelete(item),
    },
  ];
  ref: MatDialogRef<unknown, unknown>;

  constructor(private dialog: MatDialog) {}

  public open() {
    this.ref = this.dialog.open(this.htmlTemplate);
  }

  public close() {
    this.ref?.close();
  }

  onOpen() {
    this.canOpen && this.open();
    this.add.emit(this);
  }

  onEdit(item: T) {
    const selected = this.strategy.select(this.dataSource, item);
    this.edit.emit(selected);
    this.canOpen && this.open();
  }
  onView(item: T) {
    const selected = this.strategy.select(this.dataSource, item);
    this.view.emit(selected);
    this.canOpen && this.open();
  }
  onDelete(item: T) {
    this.dataSource = this.strategy.delete(item['index'] - 1, this.dataSource);
    this.dataSource = [...this.dataSource];
    this.dataSourceChange.emit(this.dataSource);
    this.delete.emit(item);
  }
  onAdd(item: T, validation = () => true) {
    this.dataSource = this.strategy.add(
      validation,
      this.dataSource,
      item
    ).items;
    this.dataSource = [...this.dataSource];
    this.dataSourceChange.emit(this.dataSource);
    this.add.emit(this);
  }
}
