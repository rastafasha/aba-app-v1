import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ListFormStrategy } from 'src/app/pages/medical/bip/components/bip-form/list-form.strategy';
import {
  AddButtonOption,
  HeadRender,
  ListOption,
  ListRender,
} from '../list/list.component';

@Component({
  selector: 'app-list-and-form',
  templateUrl: './list-and-form.component.html',
  styleUrls: ['./list-and-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListAndFormComponent<T> implements OnInit {
  @ViewChild('content', { static: true }) htmlTemplate: TemplateRef<unknown>;
  @Input() title = '';
  @Input() dataSource: T[] = null;
  @Input() newItem: T = null;
  @Output() newItemChange = new EventEmitter<T>();
  @Output() dataSourceChange = new EventEmitter<T[]>();
  @Output() edit = new EventEmitter<T>();
  @Output() view = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();
  @Output() add = new EventEmitter<ListAndFormComponent<T>>();
  @Input() displayedColumns: (keyof T)[] = [];
  //options
  @Input() addButtonOptions: AddButtonOption = {
    show: true,
    text: 'Add',
    class: 'btn btn-sm btn-primary',
    icon: 'fas fa-plus',
  };
  @Input() noDataText: string = null;
  @Input() renders: ListRender<T>;
  @Input() headRenders: HeadRender<T>;
  @Input() options: ListOption<T>[];
  //
  strategy: ListFormStrategy<T>;
  ref: MatDialogRef<unknown, unknown>;

  constructor(private dialog: MatDialog, private cdr: ChangeDetectorRef) {
    this.options = [
      {
        text: 'Edit',
        icon: 'fa fa-edit',
        class: 'btn btn-outline-primary btn-sm',
        action: (item: T) => this.onEdit(item),
      },
      {
        text: 'Delete',
        icon: 'fa fa-trash-alt',
        class: 'btn btn-outline-danger btn-sm',
        action: (item: T) => this.onDelete(item),
      },
    ];
    this.strategy = new ListFormStrategy<T>(
      this.dataSourceChange,
      this.newItem
    );
  }
  ngOnInit(): void {
    this.strategy = new ListFormStrategy<T>(
      this.dataSourceChange,
      this.newItem
    );
  }

  public open() {
    this.ref = this.dialog.open(this.htmlTemplate, {
      ariaModal: true,
      minWidth: 400,
    });
  }

  public close() {
    this.ref?.close();
  }

  onOpen() {
    this.open();
    this.add.emit(this);
  }
  onClose() {
    this.close();
  }

  onEdit(item: T) {
    const selected = this.strategy.select(this.dataSource, item);
    this.newItemChange.emit(selected);
    this.edit.emit(selected);
    this.open();
  }
  onView(item: T) {
    const selected = this.strategy.select(this.dataSource, item);
    this.newItemChange.emit(selected);
    this.view.emit(selected);
    this.open();
  }
  onDelete(item: T) {
    const index = this.dataSource.indexOf(item);
    this.dataSource = this.strategy.delete(index, this.dataSource);
    this.updateList();
    this.dataSourceChange.emit(this.dataSource);
    this.delete.emit(item);
  }
  onCreate() {
    this.newItem = this.strategy.getDefault();
    this.newItemChange.emit(this.newItem);
    this.onOpen();
  }
  onAdd(item: T, validation = () => true) {
    this.dataSource = this.strategy.add(
      validation,
      this.dataSource,
      item
    ).items;
    this.updateList();
    this.dataSourceChange.emit(this.dataSource);
    this.add.emit(this);
    this.onClose();
  }

  private updateList() {
    this.dataSource = [...this.dataSource];
    this.cdr.detectChanges();
  }
}
