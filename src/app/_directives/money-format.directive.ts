import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appMoneyFormat]'
})
export class MoneyFormatDirective {
  constructor(
    private el: ElementRef,
    private control: NgControl
  ) {}
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const allowedKeys = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Tab'
    ];
    if (allowedKeys.includes(event.key)) return;
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  }
@HostListener('input')
onInput() {
  let value = this.el.nativeElement.value;
  if (!value) {
    this.control.control?.setValue(null, { emitEvent: false });
    return;
  }
  let rawValue = value.replace(/\./g, '').replace(/[^0-9]/g, '');
  rawValue = rawValue.replace(/^0+/, '');

  if (rawValue === '') {
    rawValue = '0';
  }
  this.control.control?.setValue(Number(rawValue), { emitEvent: false });
  const formatted = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  this.el.nativeElement.value = formatted;
}
}