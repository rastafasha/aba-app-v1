import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-footer[page][total]',
  templateUrl: './table-footer.component.html',
  styleUrls: ['./table-footer.component.scss'],
})
export class TableFooterComponent {
  @Input() total = 0;
  @Input() pageSize = 10;
  @Input() page = 1;
  @Input() totalUnits: number;
  @Input() totalHours: number;
  @Input() totalCharges: number;
  @Output() pageChange = new EventEmitter<number>();

  onChangePage(page: number): void {
    if (page < 0) page = Math.ceil(this.total / this.pageSize) + page;
    this.pageChange.emit(page);
  }
}
