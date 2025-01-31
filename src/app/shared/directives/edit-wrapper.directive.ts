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
  @Output() cancel = new EventEmitter<void>();
  private editIcon: HTMLElement;
  isEditing = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Create edit icon
    this.editIcon = this.renderer.createElement('i');
    this.renderer.addClass(this.editIcon, 'fas');
    this.updateIcon();

    // Style the icon with circular background
    this.renderer.setStyle(this.editIcon, 'position', 'absolute');
    this.renderer.setStyle(this.editIcon, 'top', '8px');
    this.renderer.setStyle(this.editIcon, 'right', '8px');
    this.renderer.setStyle(this.editIcon, 'cursor', 'pointer');
    this.renderer.setStyle(this.editIcon, 'opacity', '0');
    this.renderer.setStyle(this.editIcon, 'transition', 'opacity 0.3s ease');
    this.renderer.setStyle(this.editIcon, 'background-color', '#f8f9fa');
    this.renderer.setStyle(this.editIcon, 'border-radius', '50%');
    this.renderer.setStyle(this.editIcon, 'width', '30px');
    this.renderer.setStyle(this.editIcon, 'height', '30px');
    this.renderer.setStyle(this.editIcon, 'display', 'flex');
    this.renderer.setStyle(this.editIcon, 'align-items', 'center');
    this.renderer.setStyle(this.editIcon, 'justify-content', 'center');
    this.renderer.setStyle(
      this.editIcon,
      'box-shadow',
      '0 2px 4px rgba(0,0,0,0.1)'
    );
  }

  private updateIcon() {
    // Remove existing icon classes
    this.renderer.removeClass(this.editIcon, 'fa-pencil');
    this.renderer.removeClass(this.editIcon, 'fa-times');

    // Add appropriate icon class based on state
    if (this.isEditing) {
      this.renderer.addClass(this.editIcon, 'fa-times');
      this.renderer.setStyle(this.editIcon, 'color', '##f97561');
      this.renderer.setAttribute(this.editIcon, 'title', 'Cancel');
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
        this.stopEditing(false);
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

  private scrollToTop(): void {
    // Get the element's position relative to the viewport
    const rect = this.el.nativeElement.getBoundingClientRect();
    // Get the current scroll position
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;
    // Calculate the absolute position of the element
    const absoluteElementTop = currentScroll + rect.top;
    // Scroll to the element with smooth behavior
    window.scrollTo({
      top: absoluteElementTop - 80, // 20px padding from top
      behavior: 'smooth',
    });
  }

  public stopEditing(isSaving: boolean): void {
    this.isEditing = false;
    this.updateIcon();
    this.renderer.removeClass(this.el.nativeElement, 'editing');
    this.renderer.setStyle(this.editIcon, 'opacity', '0');
    this.editingChange.emit(false);
    if (isSaving) this.save.emit();
    else this.cancel.emit();
    setTimeout(() => this.scrollToTop(), 100); // Small delay to ensure DOM has updated
  }
}
