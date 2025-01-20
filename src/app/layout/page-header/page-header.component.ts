import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent {
  constructor(private location: Location) {}
  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
