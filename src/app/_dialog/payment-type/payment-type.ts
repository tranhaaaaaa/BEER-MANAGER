import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ButtonModule, ModalModule } from '@coreui/angular';
import { ModalQr } from "../modal-qr/modal-qr";

@Component({
  selector: 'app-payment-type',
  imports: [CommonModule,
    ModalModule,
    ButtonModule, ModalQr],
  templateUrl: './payment-type.html',
  styleUrl: './payment-type.css',
})
export class PaymentType {
  visible = false;
@Input() ORDER_ID :any; 
@Input() Amount : any;
@ViewChild(ModalQr) modal! : ModalQr;
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
  }

  if(type === 'bank'){
    this.modal.openModal();
  }
}
}