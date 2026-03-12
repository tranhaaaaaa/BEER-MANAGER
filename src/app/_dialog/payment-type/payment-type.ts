import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
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
@Input() amount:number = 0; 
@ViewChild(ModalQr) modal! : ModalQr;
  paymentType: string | null = null;

  openModal(){
    this.visible = true;
  }

  closeModal(){
    this.visible = false;
  }

  select(type:string){
    this.paymentType = type;
    console.log("Payment:", type);

    this.visible = false;
  }
selectPayment(type: string){
  if(type === 'cash'){
    console.log("Thanh toán tiền mặt");
  }

  if(type === 'bank'){
    this.modal.openModal();
  }
}
}