import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { DARMODE_TOKEN } from './appearance.conts';

@Injectable({
  providedIn: 'root',
})
export class AppearanceService {
  constructor(private storage: StorageService) {}

  getLocalDarkMode() {
    setTimeout(() => {
      if (!this.storage.get(DARMODE_TOKEN)) {
        return;
      }
      const element = document.body;
      element.classList.add(DARMODE_TOKEN);
    }, 500);
  }
}
