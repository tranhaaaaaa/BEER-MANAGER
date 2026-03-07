import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule, ModalModule } from '@coreui/angular';

@Component({
  selector: 'app-payment-type',
  imports: [CommonModule,
    ModalModule,
    ButtonModule],
  templateUrl: './payment-type.html',
  styleUrl: './payment-type.css',
})
export class PaymentType {
  visible = false;

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
    console.log("Thanh toán chuyển khoản");
  }
}
}