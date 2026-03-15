import { CommonModule } from '@angular/common';
import { Component, OnInit, viewChild, ViewChild } from '@angular/core';
import { ModalCreateTable } from '../../_dialog/modal-create-table/modal-create-table';
import { FormsModule } from '@angular/forms';
import { PaymentType } from '../../_dialog/payment-type/payment-type';
import { OrderService } from '../../_services/order.service';
import { Category, Order } from '../../_models/db.model';
import { CategoryService } from '../../_services/category.service';

@Component({
  selector: 'app-list-table',
  imports: [CommonModule, ModalCreateTable, FormsModule, PaymentType],
  templateUrl: './list-table.html',
  styleUrl: './list-table.css',
})
export class ListTable implements OnInit {
  orderId: any;
  @ViewChild(ModalCreateTable) modal!: ModalCreateTable;
  @ViewChild(PaymentType) modalPayment!: PaymentType;
  tables = [
    { name: 'Bàn 1', total: 120000 },
    { name: 'Bàn 2', total: 90000 },
  ];
  categories: any[] = [];
  filteredOrders: any[] = [];

  currentCategory: string | null = null;
  public listOrder: Order[] = [];
  constructor(
    private orderService: OrderService,
    private categoryService: CategoryService,
  ) {}
  ngOnInit(): void {
    this.onGetTable();
  }
  openAdd(value?: any) {
    this.orderId = value;
    this.modal.open();
  }
  onGetTable() {
    this.orderService.getAllOrder().subscribe((data) => {
      this.listOrder = data.value;
        this.filteredOrders = this.listOrder; 
    });
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data.value.filter((x: Category) => x.Type == 1);
    });
  }
  openModalPayment(value: any) {
    this.orderId = value;
    this.modalPayment.openModal();
  }
  editTable(index: number) {
    const table = this.tables[index];

    const name = prompt('Sửa tên bàn', table.name);
    const total = prompt('Sửa tổng tiền', table.total.toString());

    if (!name || !total) return;

    this.tables[index] = {
      name: name,
      total: Number(total),
    };
  }

  deleteTable(index: number) {
    this.tables.splice(index, 1);
  }
  filterTable(category?: any) {
    if (!category) {
      this.currentCategory = null;
      this.filteredOrders = this.listOrder;
    } else {
      this.currentCategory = category.Id;

      this.filteredOrders = this.listOrder.filter((x) => x.Type === category.Id);
    }
  }
}
