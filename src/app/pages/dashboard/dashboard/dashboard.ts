import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../../../_services/signal-r.service';
import { TransactionComponent } from "../transaction/transaction";
import { ReportCost } from "../report-cost/report-cost";

@Component({
  selector: 'app-dashboard',
  imports: [TransactionComponent, ReportCost],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit{
  constructor(private signalRService: SignalRService) {}
ngOnInit(): void {
}
numberToText(num: number): string {
  return num.toLocaleString('vi-VN'); // 2.222
}
bankCode = "VPB";
accountNumber = "762530102002";
accountName = "TRAN QUANG HA";

generateQR(amount: number, table: number) {

  const content = `ODR40F3BC1C-1C3F-4306-A854-F32B2109403C`;

  return `https://img.vietqr.io/image/${this.bankCode}-${this.accountNumber}-print.png?amount=${amount}&addInfo=${encodeURIComponent(content)}&accountName=${encodeURIComponent(this.accountName)}`;
}

}
