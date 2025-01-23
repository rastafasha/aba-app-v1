import { EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';

interface ListItem {
  index?: number;
}
export class ListFormStrategy<T extends ListItem> {
  constructor(private emiter: EventEmitter<T[]>, private defaultItem: T) {
    this.defaultItem = JSON.parse(JSON.stringify(this.defaultItem));
  }
  getDefault(): T {
    return { ...this.defaultItem };
  }

  select(items: T[], search: T): T {
    const selected =
      items.find((item) => item === search) ??
      items.find((item) => item.index === search.index);
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
      item.index = index;
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

    // Check if this is a new item (index is undefined or null)
    const isNewItem = item.index === undefined || item.index === null;

    if (isNewItem) {
      // New item - add to the end of the array
      item.index = items.length;
      items.push({ ...item });
    } else {
      // Existing item - update at the specified index
      items[item.index] = { ...item };
    }

    this.emiter.emit(items);
    return { text: '', items, item: { ...this.defaultItem } };
  }
}
