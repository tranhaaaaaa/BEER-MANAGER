import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMoneyFormat]'
})
export class MoneyFormatDirective {

  constructor(private el: ElementRef) {}

  // chặn ký tự không phải số
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {

    const allowedKeys = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Tab'
    ];

    if (allowedKeys.includes(event.key)) {
      return;
    }

    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  }

  // format khi nhập
  @HostListener('input')
  onInput() {

    let value = this.el.nativeElement.value;

    if (!value) return;

    value = value.replace(/\./g, '');
    value = value.replace(/[^0-9]/g, '');

    const formatted = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    this.el.nativeElement.value = formatted;
  }

}