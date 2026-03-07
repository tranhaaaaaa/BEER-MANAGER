import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ModalCreateTable } from '../../_dialog/modal-create-table/modal-create-table';

@Component({
  selector: 'app-list-table',
  imports: [CommonModule, ModalCreateTable],
  templateUrl: './list-table.html',
  styleUrl: './list-table.css',
})
export class ListTable {
  @ViewChild(ModalCreateTable) modal! : ModalCreateTable;
 tables = [
    { name: 'Bàn 1', total: 120000 },
    { name: 'Bàn 2', total: 90000 }
  ];

  openAdd() {
    this.modal.open();
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