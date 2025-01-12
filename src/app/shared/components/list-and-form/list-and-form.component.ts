import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ListOption, ListRender } from '../list/list.component';

@Component({
  selector: 'app-list-and-form',
  templateUrl: './list-and-form.component.html',
  styleUrls: ['./list-and-form.component.scss'],
})
export class ListAndFormComponent<T> {
  @ViewChild('content', { static: true }) htmlTemplate: TemplateRef<unknown>;
  @Input() title = '';
  @Input() dataSource: T[] = null;
  @Input() displayedColumns: (keyof T)[] = [];
  @Input() options: ListOption<T>[] = null;
  //options
  @Input() noDataText: string = null;
  @Input() openButtonText: string = null;
  @Input() renders: ListRender<T>;
  ref: MatDialogRef<unknown, unknown>;

  constructor(private dialog: MatDialog) {}

  public open() {
    this.ref = this.dialog.open(this.htmlTemplate);
  }

  public close() {
    this.ref?.close();
  }

  onOpen() {
    this.open();
  }
}
