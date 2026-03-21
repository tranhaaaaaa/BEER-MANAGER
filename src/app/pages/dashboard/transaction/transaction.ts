import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../_models/db.model';
import { TransactionService } from '../../../_services/transaction.service.';
import { CardBodyComponent, CardComponent, CardHeaderComponent, TableModule } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction',
  imports: [TableModule,CommonModule,FormsModule,CardBodyComponent,CardComponent,CardHeaderComponent],
  templateUrl: './transaction.html',
  styleUrl: './transaction.css',
})
export class TransactionComponent implements OnInit{
  public listTransaction : Transaction[]=[];
  currentPage: number = 1;
pageSize: number = 5;
  constructor(private service: TransactionService){}
  ngOnInit(): void {
   this.GetDataTable();
  }
 GetDataTable(){
  this.service.getAllTransactions().subscribe((data: any) => {
    this.listTransaction = data.value
      .sort((a: any, b: any) => {
        return new Date(b.TransactionDate).getTime() - new Date(a.TransactionDate).getTime();
      });

    console.log("transaction:", this.listTransaction);
  });
}
  get pagedTransactions(): Transaction[] {
  const start = (this.currentPage - 1) * this.pageSize;
  return this.listTransaction.slice(start, start + this.pageSize);
}

get totalPages(): number {
  return Math.ceil(this.listTransaction.length / this.pageSize);
}

changePage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
  }
}
}
