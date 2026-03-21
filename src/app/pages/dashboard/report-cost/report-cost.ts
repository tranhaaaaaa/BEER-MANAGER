import { Component, OnInit } from '@angular/core';
import { Order } from '../../../_models/db.model';
import { OrderService } from '../../../_services/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardBodyComponent, CardComponent, CardHeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-report-cost',
  imports: [CommonModule,FormsModule,CardBodyComponent,CardComponent,CardHeaderComponent],
  templateUrl: './report-cost.html',
  styleUrl: './report-cost.css',
})
export class ReportCost implements OnInit{
  public listOrder: Order[] = [];

  currentPage: number = 1;
  pageSize: number = 5;

  constructor(private orderService: OrderService){}

  ngOnInit(): void {
    this.GetData();
  }

  GetData(){
    this.orderService.getAllOrder().subscribe((data: any) => {
      this.listOrder = data.value.sort((a: any, b: any) => 
        new Date(b.OrderDate).getTime() - new Date(a.OrderDate).getTime()
      );
    });
  }

  get pagedOrders(): Order[] {
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
