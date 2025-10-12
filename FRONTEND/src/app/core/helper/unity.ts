import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value === null || value === undefined) {
      return '';
    }
    const numberValue = Number(value);
    if (isNaN(numberValue)) {
      return value; 
    }

    return numberValue.toLocaleString('vi-VN'); 
  }
}
