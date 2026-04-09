import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ButtonModule, ModalModule } from '@coreui/angular';
import { ModalQr } from "../modal-qr/modal-qr";
import { HttpService } from '../../_services/http.service';
import { ModalCashPayment } from "../modal-cash-payment/modal-cash-payment";

@Component({
  selector: 'app-payment-type',
  imports: [CommonModule,
    ModalModule,
    ButtonModule, ModalQr, ModalCashPayment],
  templateUrl: './payment-type.html',
  styleUrl: './payment-type.css',
})
export class PaymentType {
  visible = false;
@Input() ORDER_ID :any; 
@Input() Amount : any;
@ViewChild(ModalQr) modal! : ModalQr;
@ViewChild(ModalCashPayment) cashPaymentModal! : ModalCashPayment;
@Output() paymentSuccess = new EventEmitter<any>();
  paymentType: string | null = null;
  openModal(){
    this.visible = true;
  }

  closeModal(){
    this.visible = false;
  }
onPaymentSuccess(data: any) {
  this.paymentSuccess.emit(data);
  this.closeModal();
}
  select(type:string){
    this.paymentType = type;

    this.visible = false;
  }
selectPayment(type: string){
  if(type === 'cash'){
    this.cashPaymentModal.openModal();
  }

  if(type === 'bank'){
    this.modal.openModal();
  }
}
}