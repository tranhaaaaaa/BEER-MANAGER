import { CommonModule } from '@angular/common';
import { Component, viewChild, ViewChild } from '@angular/core';
import { ModalCreateTable } from '../../_dialog/modal-create-table/modal-create-table';
import { FormsModule } from '@angular/forms';
import { PaymentType } from "../../_dialog/payment-type/payment-type";

@Component({
  selector: 'app-list-table',
  imports: [CommonModule, ModalCreateTable, FormsModule, PaymentType],
  templateUrl: './list-table.html',
  styleUrl: './list-table.css',
})
export class ListTable {
  amount : number = 0;
  @ViewChild(ModalCreateTable) modal! : ModalCreateTable;
  @ViewChild(PaymentType) modalPayment! : PaymentType;
 tables = [
    { name: 'Bàn 1', total: 120000 },
    { name: 'Bàn 2', total: 90000 }
  ];

  openAdd() {
    this.modal.open();
  }
  openModalPayment(value : any){
    this.amount = value;
    this.modalPayment.openModal();
  }
  editTable(index: number) {

    const table = this.tables[index];

    const name = prompt('Sửa tên bàn', table.name);
    const total = prompt('Sửa tổng tiền', table.total.toString());

    if (!name || !total) return;

    this.tables[index] = {
      name: name,
      total: Number(total)
    };

  }

  deleteTable(index: number) {
    this.tables.splice(index, 1);
  }
  
}