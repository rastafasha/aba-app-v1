import {
  Directive,
  ElementRef,
  EventEmitter,
  Output,
  Renderer2,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appEditWrapper]',
  exportAs: 'editWrapper',
})
export class EditWrapperDirective implements OnInit {
  @Output() editingChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<void>();
  private editIcon: HTMLElement;
  isEditing = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Create edit icon
    this.editIcon = this.renderer.createElement('i');
    this.renderer.addClass(this.editIcon, 'fas');
    this.updateIcon();

    // Style the icon
    this.renderer.setStyle(this.editIcon, 'position', 'absolute');
    this.renderer.setStyle(this.editIcon, 'top', '8px');
    this.renderer.setStyle(this.editIcon, 'right', '8px');
    this.renderer.setStyle(this.editIcon, 'cursor', 'pointer');
    this.renderer.setStyle(this.editIcon, 'opacity', '0');
    this.renderer.setStyle(this.editIcon, 'transition', 'opacity 0.3s ease');
  }

  private updateIcon() {
    // Remove existing icon classes
    this.renderer.removeClass(this.editIcon, 'fa-pencil');
    this.renderer.removeClass(this.editIcon, 'fa-check');

    // Add appropriate icon class based on state
    if (this.isEditing) {
      this.renderer.addClass(this.editIcon, 'fa-check');
      this.renderer.setStyle(this.editIcon, 'color', '#198754'); // Bootstrap success color
      this.renderer.setAttribute(this.editIcon, 'title', 'Save changes');
    } else {
      this.renderer.addClass(this.editIcon, 'fa-pencil');
      this.renderer.removeStyle(this.editIcon, 'color');
      this.renderer.setAttribute(this.editIcon, 'title', 'Edit');
    }
  }

  ngOnInit() {
    // Setup container and append icon
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.renderer.appendChild(this.el.nativeElement, this.editIcon);

    // Add hover effects
    this.renderer.listen(this.el.nativeElement, 'mouseenter', () => {
      this.renderer.setStyle(this.editIcon, 'opacity', '1');
    });

    this.renderer.listen(this.el.nativeElement, 'mouseleave', () => {
      if (!this.isEditing) {
        this.renderer.setStyle(this.editIcon, 'opacity', '0');
      }
    });

    // Modify click handler for both edit and save
    this.renderer.listen(this.editIcon, 'click', (event: Event) => {
      event.stopPropagation();
      if (this.isEditing) {
        this.save.emit();
        this.stopEditing();
      } else {
        this.startEditing();
      }
    });
  }

  get editing(): boolean {
    return this.isEditing;
  }

  public startEditing(): void {
    this.isEditing = true;
    this.updateIcon();
    this.renderer.addClass(this.el.nativeElement, 'editing');
    this.renderer.setStyle(this.editIcon, 'opacity', '1');
    this.editingChange.emit(true);
  }

  public stopEditing(): void {
    this.isEditing = false;
    this.updateIcon();
    this.renderer.removeClass(this.el.nativeElement, 'editing');
    this.renderer.setStyle(this.editIcon, 'opacity', '0');
    this.editingChange.emit(false);
  }
}
