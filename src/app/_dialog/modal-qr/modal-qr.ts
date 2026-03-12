import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule, ModalModule } from '@coreui/angular';

@Component({
  selector: 'app-modal-qr',
  imports: [ CommonModule,
    ModalModule,
    ButtonModule],
  templateUrl: './modal-qr.html',
  styleUrl: './modal-qr.css',
})
export class ModalQr {
   visible = false;
bankCode = "970436";
accountNumber = "9945051936";
accountName = "TRAN QUANG HA";
@Input() amount: any;
generateQR() {

  const content = `Thanh toan`;

  return `https://img.vietqr.io/image/${this.bankCode}-${this.accountNumber}-print.png?amount=${this.amount}&addInfo=${encodeURIComponent(content)}&accountName=${encodeURIComponent(this.accountName)}`;
}
 openModal(){
    this.visible = true;
  }

  closeModal(){
    this.visible = false;
  }

}
