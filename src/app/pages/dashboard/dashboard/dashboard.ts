import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
bankCode = "970436";
accountNumber = "9945051936";
accountName = "TRAN QUANG HA";

generateQR(amount: number, table: number) {

  const content = `Ban ${table}`;

  return `https://img.vietqr.io/image/${this.bankCode}-${this.accountNumber}-print.png?amount=${amount}&addInfo=${encodeURIComponent(content)}&accountName=${encodeURIComponent(this.accountName)}`;
}
}
