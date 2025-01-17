import { EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';

interface ListItem {
  index?: number;
}
export class ListFormStrategy<T extends ListItem> {
  constructor(private emiter: EventEmitter<T[]>, private defaultItem: T) {
    this.defaultItem = { ...this.defaultItem };
  }
  getDefault(): T {
    return { ...this.defaultItem };
  }

  select(items: T[], search: T): T {
    const selected = items.find((item) => item.index === search.index);
    return selected;
  }

  updateList(items: T[], item: T): T {
    const index = items.findIndex((item) => item.index === item.index);
    if (index === -1) {
      return item;
    }
    items[index] = item;
    Swal.fire(
      'Updated',
      `Updated item List successfully, if you finish the list, now press button save!`,
      'success'
    );
    this.emiter.emit(items);
    return item;
  }

  delete(i: number, items: T[]): T[] {
    items.splice(i, 1);
    items.forEach((item, index) => {
      item.index = index + 1;
    });
    this.emiter.emit(items);
    return items;
  }
  add(
    validate: () => boolean,
    items: T[],
    item: T
  ): { text: string; items: T[]; item: T } {
    if (!validate()) {
      return { text: 'Please enter all fields', items, item };
    }
    items ??= [];
    if (!items.find((i) => i.index === item.index)) {
      item.index = items.length + 1;
      items.push({ ...item });
    } else {
      items[item.index - 1] = { ...item };
    }
    this.emiter.emit(items);
    return { text: '', items, item: { ...this.defaultItem } };
  }
}
