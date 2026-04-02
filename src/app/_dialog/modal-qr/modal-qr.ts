import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ButtonModule, ModalModule } from '@coreui/angular';
import { SignalRService } from '../../_services/signal-r.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-modal-qr',
  imports: [ CommonModule,
    ModalModule,
    ButtonModule],
  templateUrl: './modal-qr.html',
  styleUrl: './modal-qr.css',
})
export class ModalQr implements OnInit{
   visible = false;
bankCode = "VPB";
accountNumber = "762530102002";
accountName = "TRAN QUANG HA";
@Input() ORDER_ID : any;
@Input() amount: any;
@Output() paymentSuccess = new EventEmitter<any>();
constructor(private signalRService: SignalRService){}

ngOnInit(): void {
  this.signalRService.payment$
    .subscribe((data) => {
      console.log('🔔 Payment Success modal:', data);
      if (!data) return;
      this.closeModal();
      
      this.paymentSuccess.emit(data);
    });
}
generateQR() {

  const content = "ODR"+this.ORDER_ID;

  return `https://img.vietqr.io/image/${this.bankCode}-${this.accountNumber}-print.png?amount=${this.amount}&addInfo=${encodeURIComponent(content)}&accountName=${encodeURIComponent(this.accountName)}`;
}
 openModal(){
    this.visible = true;
  }

  closeModal(){
    this.visible = false;
  }

}
