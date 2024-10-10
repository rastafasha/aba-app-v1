import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {
    //
  }

  get<T>(token: string) {
    const item = localStorage.getItem(token);
    if (!item) return null;
    try {
      const result = JSON.parse(item);
      if (result === null) return null;
      if (typeof result === 'object') {
        return result as T;
      } else if (typeof result === 'string') {
        return result as T;
      } else {
        return result as T;
      }
    } catch (e) {
      return item as T;
    }
  }

  set(token: string, value: unknown) {
    if (typeof value === 'string') {
      localStorage.setItem(token, value);
    } else {
      localStorage.setItem(token, JSON.stringify(value));
    }
  }

  remove(token: string) {
    localStorage.removeItem(token);
  }
}
