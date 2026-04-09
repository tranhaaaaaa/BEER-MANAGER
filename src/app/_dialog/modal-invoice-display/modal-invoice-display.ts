import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule, ModalBodyComponent, ModalModule } from '@coreui/angular';
import { HttpService } from '../../_services/http.service';

@Component({
  selector: 'app-modal-invoice-display',
  imports: [ModalBodyComponent,ModalModule,CommonModule,FormsModule,ButtonModule],
  templateUrl: './modal-invoice-display.html',
  styleUrl: './modal-invoice-display.css',
})
export class ModalInvoiceDisplay implements OnChanges {
  @Input() ORDER_ID: any;
   visible = false;
   invoiceData: any;
constructor(private httpService: HttpService) {}
   openModal() {
    this.visible = true;
  }
  closeModal() {
    this.visible = false;
  }
ngOnChanges(changes: SimpleChanges): void {
    if (changes['ORDER_ID'] && this.ORDER_ID) {
      this.onGetOrderDetail();
    }
}

 onGetOrderDetail() {
    if (!this.ORDER_ID) {
      console.error('ORDER_ID không hợp lệ:', this.ORDER_ID);
      return;
    }
    this.httpService.get(`/api/customapi/order-items/${this.ORDER_ID}`).subscribe((data: any) => {
      this.invoiceData = data.Data;
      console.log('Dữ liệu hóa đơn:', this.invoiceData);
    });
 }
}
