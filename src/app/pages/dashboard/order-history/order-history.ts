import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Order } from '../../../_models/db.model';
import { OrderService } from '../../../_services/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardBodyComponent, CardComponent, CardHeaderComponent, TableModule } from '@coreui/angular';
import { HttpService } from '../../../_services/http.service';

@Component({
  selector: 'app-order-history',
  imports: [TableModule,CommonModule,FormsModule,CardBodyComponent,CardComponent,CardHeaderComponent],
  templateUrl: './order-history.html',
  styleUrl: './order-history.css',
})
export class OrderHistory implements OnInit,OnChanges{
  public listOrder: any[] = [];
 @Input() startDate: string = '';
  @Input() endDate: string = '';
  currentPage: number = 1;
  pageSize: number = 5;

  constructor(private orderService: OrderService,
    private httpService : HttpService
  ){}
  ngOnChanges(changes: SimpleChanges): void {
     console.log('Start Date:', this.startDate);
    console.log('End Date:', this.endDate);
   this.GetData();
  }

  ngOnInit(): void {
    // this.GetData();
  }

GetData() {

  if (!this.startDate || !this.endDate) return;

  const start = `${this.startDate}`;
  const end = `${this.endDate}`;

  this.httpService
    .get(`/api/Report/order-list?orderDateStart=${start}&orderDateEnd=${end}`)
    .subscribe((data: any) => {

      this.listOrder = data.sort((a: any, b: any) =>
        new Date(b.OrderDate).getTime() - new Date(a.OrderDate).getTime()
      );
      console.log('Order List:', this.listOrder);
      

    });
}

  get pagedOrders(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.listOrder.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.listOrder.length / this.pageSize);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  getStatusText(status: number): string {
    switch(status){
      case 0: return 'Chờ xử lý';
      case 1: return 'Đã thanh toán';
      case 2: return 'Đã hủy';
      default: return 'Không rõ';
    }
  }

  getStatusClass(status: number): string {
    switch(status){
      case 0: return 'bg-warning';
      case 1: return 'bg-success';
      case 2: return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

}
