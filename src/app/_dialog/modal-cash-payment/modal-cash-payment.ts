import { Component, EventEmitter, Input, NgModule, OnChanges, Output, SimpleChanges } from '@angular/core';
import { HttpService } from '../../_services/http.service';
import { ButtonModule, ModalBodyComponent, ModalModule } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-cash-payment',
  imports: [ModalBodyComponent,ModalModule,CommonModule,FormsModule,ButtonModule],
  templateUrl: './modal-cash-payment.html',
  styleUrl: './modal-cash-payment.css',
})
export class ModalCashPayment implements OnChanges{
    visible = false;
    customerPaid = 0;
    orderData: any;
  @Input() ORDER_ID :any;
   @Output() paymentSuccess = new EventEmitter<any>();
  constructor(private httpService: HttpService,
    private toastrService : ToastrService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ORDER_ID'] && this.ORDER_ID) {
        this.initialData();
    }
  }
  confirmPayment(){

 if(this.ORDER_ID){
   const payload = {

    orderId: this.ORDER_ID,
  };
  this.httpService.post('/api/CustomApi/cash-payment', payload).subscribe((res: any) => {
      if(res && res['status'] === 'success'){
        this.toastrService.success('Xác nhận thanh toán thành công!');
         this.visible = false;
          this.paymentSuccess.emit(res);
      }
  });

 }
}
closeModal(){
  this.visible = false;
}
  openModal(){
    this.visible = true;
  }
  initialData(){
    if(this.ORDER_ID){
      this.httpService.get(`/api/customapi/order-items/${this.ORDER_ID}`).subscribe((data: any) => {
        this.orderData = data.Data;
      });
      
    }
  }
} 
