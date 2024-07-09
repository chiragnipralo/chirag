import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCapitalizeFirst]'
})
export class CapitalizeFirstDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    const start = this.el.nativeElement.selectionStart;
    const end = this.el.nativeElement.selectionEnd;

    const value = event.target.value;
    if (value.length > 0) {
      this.el.nativeElement.value = value.charAt(0).toUpperCase() + value.slice(1);
    }

    this.el.nativeElement.setSelectionRange(start, end);
  }
}
